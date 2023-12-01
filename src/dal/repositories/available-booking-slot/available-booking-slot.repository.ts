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
}
