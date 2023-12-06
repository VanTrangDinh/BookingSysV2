import { CreateBookingRequestDto } from '../../../app/booking/dtos';
import { BaseRepository } from '../base-repository';
import { AvailableBookingSlotDBModel, AvailableBookingSlotEntity } from './available-booking-slot.entity';
import { AvailableBookingSlot } from './available-booking-slot.schema';

export class AvailableBookingSlotRepository extends BaseRepository<
  AvailableBookingSlotDBModel,
  AvailableBookingSlotEntity,
  object
> {
  constructor() {
    super(AvailableBookingSlot, AvailableBookingSlotEntity);
  }

  async bookingConflict(query: CreateBookingRequestDto) {
    return await this._model
      .find({
        _listingId: query._listingId,
        $or: [
          { startDate: { $gt: query.checkInDate, $lt: query.checkOutDate } },
          { endDate: { $gt: query.checkInDate, $lt: query.checkOutDate } },
          {
            $and: [{ startDate: { $lte: query.checkInDate } }, { endDate: { $gte: query.checkOutDate } }],
          },
        ],
      })
      .countDocuments();
  }
}
