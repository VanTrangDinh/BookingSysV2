import { CustomDataType } from '../shared';

export type ListingId = string;

export type ListingCustomData = CustomDataType;

export interface IListingPayload {
  data?: ListingCustomData;
}

export interface IListingDefine extends IListingPayload {
  subscriberId: string;
}

export interface IListingDBModel {
  _hostId?: string;
  propertyName?: string;
  zipcode?: number;
  pathroomCnt?: number;
  roomCnt?: number;
  guestNum?: number;
  pricePerNight?: number;
  cleaningFee?: number;
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
}

export interface IListingsDefine extends IListingDBModel {
  listingId: string;
}
