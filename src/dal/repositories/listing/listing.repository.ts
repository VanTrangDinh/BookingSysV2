import { SoftDeleteModel } from 'mongoose-delete';
import { FilterQuery } from 'mongoose';

import { BaseRepository } from '../base-repository';

import { ListingDBModel, ListingEntity } from './listing.entity';
import { Listing } from './listing.schema';
import { EnforceEnvOrOrgIdsV2 } from '../../types';
import { DalException } from '../../shared';
import { IListingsDefine } from '../../../shared';

type ListingQuery = FilterQuery<ListingDBModel> & EnforceEnvOrOrgIdsV2;

export class ListingRepository extends BaseRepository<ListingDBModel, ListingEntity, ListingQuery> {
  private listing: SoftDeleteModel;
  constructor() {
    super(Listing, ListingEntity);
    this.listing = Listing;
  }

  async bulkCreateListings(listings: IListingsDefine[]) {
    const bulkWriteOps = listings.map((listing) => {
      const { listingId, ...rest } = listing;

      return {
        updateOne: {
          filter: { listingId },
          update: { $set: rest },
          upsert: true,
        },
      };
    });

    let bulkResponse;
    try {
      bulkResponse = await this.bulkWrite(bulkWriteOps);
    } catch (e) {
      if (!e.writeErrors) {
        throw new DalException(e.message);
      }
      bulkResponse = e.result;
    }

    const created = bulkResponse.getUpsertedIds();
    const writeErrors = bulkResponse.getWriteErrors();

    const indexes: number[] = [];

    const insertedListings = created.map((inserted) => {
      indexes.push(inserted.index);

      return mapToListingObject(listings[inserted.index]?.listingId);
    });

    let failed = [];
    if (writeErrors.length > 0) {
      failed = writeErrors.map((error) => {
        indexes.push(error.err.index);

        return {
          message: error.err.errmsg,
          listingId: error.err.op?._id,
        };
      });
    }

    const updatedListings = listings
      .filter((listing, index) => !indexes.includes(index))
      .map((listing) => {
        return mapToListingObject(listing.listingId);
      });

    return {
      updated: updatedListings,
      created: insertedListings,
      failed,
    };
  }

  async findById(id: string, select?: string): Promise<ListingEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }
}

function mapToListingObject(subscriberId: string) {
  return { subscriberId };
}
function regExpEscape(literalString: string): string {
  return literalString.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, '\\$&');
}
