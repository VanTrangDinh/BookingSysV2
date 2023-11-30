import { SoftDeleteModel } from 'mongoose-delete';
import { FilterQuery } from 'mongoose';

import { BaseRepository } from '../base-repository';

import { ListingDBModel, ListingEntity } from './listing.entity';
import { Listing } from './listing.schema';
// import { EnforceEnvOrOrgIdsV2 } from '../../types';
import { DalException } from '../../shared';
import { IListingsDefine } from '../../../shared';
import { SearchDto } from '../../../app/listing/dtos';
import { SearchCommand } from '../../../app/listing/usecases/search-listing/search-listing.commad';

// type ListingQuery = FilterQuery<ListingDBModel> & EnforceEnvOrOrgIdsV2;
export type ListingQuery = FilterQuery<ListingDBModel>;

export class ListingRepository extends BaseRepository<ListingDBModel, ListingEntity, object> {
  private listing: SoftDeleteModel;

  constructor() {
    super(Listing, ListingEntity);
    this.listing = Listing;
  }

  async delete(query: ListingQuery) {
    const foundListing = await this.findOne(
      {
        _hostId: query._hostId,
        _id: query._id,
      },
      { isAvailable: false },
    );

    if (!foundListing) {
      throw new DalException(`Could not find subscriber ${query._id} to delete`);
    }

    const requestQuery: ListingQuery = {
      _hostId: query._hostId,
      _id: query._id,
    };

    return await this.listing.delete(requestQuery);
  }

  async findDeleted(query: ListingQuery) {
    const requestQuery: ListingQuery = {
      _hostId: query._hostId,
      _id: query._id,
    };

    const res = await this.listing.findDeleted(requestQuery);

    return this.mapEntity(res);
  }

  async searchListings(searchParams: SearchCommand): Promise<ListingEntity[]> {
    const { city, street, country, checkInTime, checkOutTime, guestNum } = searchParams;

    const filters: any = [];

    if (city?.length) {
      filters.push({
        city: {
          $regex: regExpEscape(city),
          $options: 'i',
        },
      });
    }

    if (street?.length) {
      filters.push({
        street: {
          $regex: regExpEscape(street),
          $options: 'i',
        },
      });
    }

    if (country?.length) {
      filters.push({
        country: {
          $regex: regExpEscape(country),
          $options: 'i',
        },
      });
    }

    if (checkInTime) {
      filters.push({
        $or: [{ checkInTime: { $lte: checkInTime } }, { checkInTime: null }],
      });
      // filters.push({ checkInTime: { $lte: checkInTime } });
    }

    if (checkOutTime) {
      filters.push({
        $or: [{ checkOutTime: { $gte: checkOutTime } }, { checkOutTime: null }],
      });
      // filters.push({ checkOutTime: { $gte: checkOutTime } });
    }

    if (guestNum !== undefined) {
      filters.push({ guestNum: { $gte: guestNum } });
    }

    // Combine filters using logical AND
    const query = filters.length > 0 ? { $and: filters } : {};

    // Execute the search query
    const results = await this.find(query as ListingQuery);

    return results as ListingEntity[];
  }

  async findAll(options: { limit?: number; sort?: any; skip?: number } = {}): Promise<ListingEntity[]> {
    const data = await this._model
      .find({
        sort: options.sort || null,
      })
      .skip(options.skip as number)
      .limit(options.limit as number)
      .lean()
      .exec();

    return this.mapEntities(data);
  }

  async findByHostId(_hostId: string, secondaryRead = false): Promise<ListingEntity | null> {
    return await this.findOne(
      {
        _hostId,
      },
      undefined,
      { readPreference: secondaryRead ? 'secondaryPreferred' : 'primary' },
    );
  }

  // async findByListingId(_hostId: string, _id: string): Promise<ListingEntity> {
  //   const data = await this.MongooseModel.find({
  //     _hostId: _hostId,
  //     _id: _id,
  //   });

  //   // if (!data) return null;

  //   return data as ListingEntity;
  // }

  async findByListingId(listingId: string, secondaryRead = false): Promise<ListingEntity | null> {
    const data = await this.findOne(
      {
        _id: listingId,
      },
      undefined,
      { readPreference: secondaryRead ? 'secondaryPreferred' : 'primary' },
    );

    return data as ListingEntity;
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

  async findById(listingId?: string, _hostId?: string) {
    return await this.findOne({ listingId, _hostId });
  }
}

function mapToListingObject(subscriberId: string) {
  return { subscriberId };
}
function regExpEscape(literalString: string): string {
  return literalString.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, '\\$&');
}
