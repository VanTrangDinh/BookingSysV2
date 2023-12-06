import { BaseRepository } from '../base-repository';
import { BookingDBModel, BookingEntity } from './booking.entity';
import { Booking } from './booking.schema';

// type ListingQuery = FilterQuery<BookingDBModel>;

export class BookingRepository extends BaseRepository<BookingDBModel, BookingEntity, object> {
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
}
