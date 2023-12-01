import { ChangePropsValueType } from '../../types';

export class AvailableBookingSlotEntity {
  _id: string;
  _listingId: string;
  startDate: Date;
  endDate: Date;
}

export type AvailableBookingSlotDBModel = ChangePropsValueType<AvailableBookingSlotEntity, '_listingId'>;
