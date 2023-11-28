import { SoftDeleteModel } from 'mongoose-delete';
import { FilterQuery } from 'mongoose';

import { BaseRepository } from '../base-repository';

import { ListingDBModel, ListingEntity } from './listing.entity';
import { Listing } from './listing.schema';
import { EnforceEnvOrOrgIdsV2 } from '../../types';
import { DalException } from '../../shared';
import { IListingsDefine } from '../../../shared';
import { SearchDto } from '../../../app/listing/dtos';
import { SearchCommand } from '../../../app/listing/usecases/search-listing/search-listing.commad';

type ListingQuery = FilterQuery<ListingDBModel> | EnforceEnvOrOrgIdsV2;

export class ListingRepository extends BaseRepository<ListingDBModel, ListingEntity, ListingQuery> {
  private listing: SoftDeleteModel;

  constructor() {
    super(Listing, ListingEntity);
    this.listing = Listing;
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
      filters.push({ checkInTime: { $lte: checkInTime } });
    }

    if (checkOutTime) {
      filters.push({ checkOutTime: { $lte: checkOutTime } });
    }

    if (guestNum !== undefined) {
      filters.push({ guestNum: { $lte: guestNum } });
    }

    // Combine filters using logical AND
    const query = filters.length > 0 ? { $and: filters } : {};

    // Execute the search query
    const results = await this.find(query);

    return results as ListingEntity[];

    // const query: any = {
    //   // isPublished: true, // Assuming this is a common filter for published listings
    // };

    // if (city) {
    //   query.city = city;
    // }

    // if (street) {
    //   query.street = street;
    // }

    // if (country) {
    //   query.country = country;
    // }

    // if (checkInTime && checkOutTime) {
    //   // Search for listings available between the specified check-in and check-out times
    //   query.checkInTime = { $lte: checkInTime };
    //   query.checkOutTime = { $gte: checkOutTime };
    // }

    // if (guestNum) {
    //   query.guestNum = guestNum;
    // }

    // // Perform the MongoDB query with the constructed query object
    // const results = await this.find(query);

    // return results as ListingEntity[];

    // const query: any = {};

    // if (city || street || country) {
    //   query.$text = {
    //     $search: [city, street, country].filter(Boolean).join(' '),
    //   };
    // }

    // console.log(query);

    // if (checkInTime || checkOutTime) {
    //   query.checkInTime = {};
    //   if (checkInTime) query.checkInTime.$gte = checkInTime;
    //   if (checkOutTime) query.checkInTime.$lt = checkOutTime;
    // }

    // if (guestNum) {
    //   query.guestNum = guestNum;
    // }

    // try {
    //   console.log({ query });

    //   const regexSearch = new RegExp(query, 'i');
    //   const results = await this.find(regexSearch, {
    //     score: { $meta: 'textScore' }, // For sorting based on text search relevance
    //   });

    //   return results as ListingEntity[];
    // } catch (error) {
    //   console.error('Error in searchListings:', error);
    //   throw error;
    // }
    // try {
    //   const { searchKey, city, street, country, checkInTime, checkOutTime, guestNum } = searchParams;
    //   const regexSearch = new RegExp(searchKey, 'i');
    //   // Construct the search query based on the provided parameters
    //   const query: any = { $text: { $search: regexSearch } };
    //   if (city) query.city = city;
    //   if (street) query.street = street;
    //   if (country) query.country = country;
    //   if (checkInTime) query.checkInTime = { $gte: checkInTime };
    //   if (checkOutTime) query.checkOutTime = { $lte: checkOutTime };
    //   if (guestNum) query.guestNum = guestNum;
    //   // Use the text index for full-text search
    //   const results = await this.find(query, { score: { $meta: 'textScore' } });
    //   return results as ListingEntity[];
    // } catch (error) {}
    // const regexSearch = new RegExp(keySearch, 'i'); // 'i' for case-insensitive
    // const results = await this.find({
    //   propertyName: { $regex: regexSearch },
    // });
    // return results as ListingEntity[];
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
