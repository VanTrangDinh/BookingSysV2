import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { BookingDBModel } from './booking.entity';
import { schemaOptions } from '../schema-default.options';

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
    adultsGuestNum: Schema.Types.Number,
    childrenGuestNum: Schema.Types.Number,
    infantsGuestNum: Schema.Types.Number,
    petsNum: Schema.Types.Number,
    isCancelled: Schema.Types.Boolean,
    refundPaid: Schema.Types.Number,
    cancelDate: Schema.Types.Date,
    promoCode: Schema.Types.String,
    totalPrice: Schema.Types.Number,
    tax: Schema.Types.Number,
    totalPriceTax: Schema.Types.Number,
    amountDue: Schema.Types.Number,
    refundAmount: Schema.Types.Number,
  },
  schemaOptions,
);

export const Booking =
  (mongoose.models.Booking as mongoose.Model<BookingDBModel>) ||
  mongoose.model<BookingDBModel>('Booking', bookingSchema);
