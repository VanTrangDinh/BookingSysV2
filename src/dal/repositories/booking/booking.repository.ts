import { FilterQuery } from 'mongoose';
import { BaseRepository } from '../base-repository';
import { BookingDBModel, BookingEntity } from './booking.entity';
import { Booking } from './booking.schema';

type BookingQuery = FilterQuery<BookingDBModel>;

// type SubscriberQuery = FilterQuery<SubscriberDBModel> & EnforceEnvOrOrgIds;

export class BookingRepository extends BaseRepository<BookingDBModel, BookingEntity, BookingQuery> {
  constructor() {
    super(Booking, BookingEntity);
  }

  //check if checkIndate, checkOutDate, occupancy
  async isListingAvailable(listingId: string, checkInDate: Date, checkOutDate: Date): Promise<boolean> {
    // Kiểm tra xem có bất kỳ đặt phòng nào khác nằm trong khoảng thời gian yêu cầu không
    const existingBookings = await this.find({
      _listingId: listingId,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return existingBookings.length === 0;
  }

  async filterBooking(
    query: FilterQuery<BookingDBModel>,
    pagination: { limit: number; skip: number },
  ): Promise<BookingEntity[]> {
    const parsedQuery = { ...query };
    if (query._id) {
      parsedQuery._id = this.convertStringToObjectId(query._id);
    }

    parsedQuery._listingId = this.convertStringToObjectId(query._listingId);

    const data = await this.aggregate([
      {
        $match: parsedQuery,
      },
      {
        $skip: pagination.skip,
      },
      {
        $limit: pagination.limit,
      },
    ]);

    return data;
  }

  async getBookingsByHost(listingId: string) {
    const requestQuery: BookingQuery = {
      _listingId: listingId,
    };

    const members = await this.MongooseModel.find(requestQuery).populate(
      '_userId',
      'firstName lastName email _id profilePicture createdAt',
    );
    if (!members) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const membersEntity: any = this.mapEntities(members);

    return [
      ...membersEntity.map((member) => {
        return {
          ...member,
          _userId: member._userId ? member._userId._id : null,
          user: member._userId,
        };
      }),
    ];
  }
}
