import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

import { schemaOptions } from '../schema-default.options';

import { ListingDBModel } from './listing.entity';

const lisingSchema = new Schema<ListingDBModel>(
  {
    _hostId: {
      type: Schema.Types.ObjectId,
      ref: 'Host',
      index: true,
    },
    propertyName: Schema.Types.String,

    zipcode: Schema.Types.Number,

    pathroomCnt: Schema.Types.Number,

    roomCnt: Schema.Types.Number,

    guestNum: Schema.Types.Number,

    pricePerNight: Schema.Types.Number,

    cleaningFee: Schema.Types.Number,

    checkInTime: Schema.Types.Date,

    checkOutTime: Schema.Types.Date,

    isRefundable: Schema.Types.String,

    cancellationPeriod: Schema.Types.Number,

    cancellationType: Schema.Types.String,

    refundRate: Schema.Types.Number,

    numOfRatings: {
      type: Schema.Types.Number,
      default: 0,
    },
    avgRatings: Schema.Types.Number,

    street: Schema.Types.String,

    city: Schema.Types.String,

    stateofResidence: Schema.Types.String,

    country: Schema.Types.String,

    taxRate: Schema.Types.Number,
  },

  schemaOptions,
);

lisingSchema.index({
  _hostId: 1,
  _id: 1,
});

lisingSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, overrideMethods: 'all' });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Listing =
  (mongoose.models.Listing as mongoose.Model<ListingDBModel>) ||
  mongoose.model<ListingDBModel>('Listing', lisingSchema);
