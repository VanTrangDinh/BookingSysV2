import { ChangePropsValueType } from '../../types';

export class ListingEntity {
  _id?: string;

  _hostId?: string;

  propertyName?: string;

  zipcode?: number;

  pathroomCnt?: number;

  roomCnt?: number;

  guestNum?: number;

  pricePerNight?: number;

  cleaningFee?: number;

  created?: string;

  checkInTime?: Date;

  checkOutTime?: Date;

  isRefundable?: string;

  cancellationPeriod?: number;

  cancellationType?: string;

  refundRate?: number;

  numOfRatings?: number;

  avgRatings?: number;

  street?: string;

  city?: string;

  stateofResidence?: string;

  country?: string;

  taxRate?: number;

  isAvailable?: boolean;

  // isDraft?: boolean;

  // isPublished?: boolean;
}

export type ListingDBModel = ChangePropsValueType<ListingEntity, '_hostId'>;
