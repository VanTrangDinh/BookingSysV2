import { ChangePropsValueType } from '../../types';

export class BookingEntity {
  _id: string;
  checkInDate: Date;
  checkOutDate: Date;
  amountPaid: number;
  bookingDate: Date;
  modifiedDate: Date;
  adultsGuestNum: number;
  childrenGuestNum: number;
  infantsGuestNum: number;
  petsNum: number;
  isCancelled: boolean;
  refundPaid: number;
  cancelDate: Date;
  promoCode: string;
  _userId: string;
  _listingId: string;
  totalPrice: number;
  tax: number;
  totalPriceTax: number;
  amountDue: number;
  refundAmount: number;
}

export type BookingDBModel = ChangePropsValueType<BookingEntity, '_userId', 'listingId'>;
