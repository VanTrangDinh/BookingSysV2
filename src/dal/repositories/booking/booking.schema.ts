import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { BookingDBModel } from './booking.entity';
import { schemaOptions } from '../schema-default.options';
import { BookingStatus } from '../../../shared';

const bookingSchema = new Schema<BookingDBModel>(
  {
    _userId: {
      type: Schema.Types.String,
      ref: 'user',
      index: true,
    },
    _listingId: {
      type: Schema.Types.String,
      ref: 'listing',
      index: true,
    },
    checkInDate: Schema.Types.Date,
    checkOutDate: Schema.Types.Date,
    amountPaid: Schema.Types.Number,
    bookingDate: Schema.Types.Date,
    modifiedDate: Schema.Types.Date,
    adultsGuestNum: {
      type: Schema.Types.Number,
      default: 0,
    },
    childrenGuestNum: {
      type: Schema.Types.Number,
      default: 0,
    },
    infantsGuestNum: {
      type: Schema.Types.Number,
      default: 0,
    },
    petsNum: {
      type: Schema.Types.Number,
      default: 0,
    },
    isCancelled: {
      type: Schema.Types.Boolean,
      default: false,
    },
    cancelDate: Schema.Types.Date,
    refundPaid: Schema.Types.Number,
    promoCode: Schema.Types.String,
    totalPrice: Schema.Types.Number,
    tax: Schema.Types.Number,
    totalPriceTax: Schema.Types.Number,
    amountDue: Schema.Types.Number,
    refundAmount: Schema.Types.Number,
    status: {
      type: Schema.Types.String,
      enum: BookingStatus,
      default: BookingStatus.PENDING, // Giá trị mặc định là "Pending"
    },
  },
  schemaOptions,
);

export const Booking =
  (mongoose.models.Booking as mongoose.Model<BookingDBModel>) ||
  mongoose.model<BookingDBModel>('Booking', bookingSchema);
