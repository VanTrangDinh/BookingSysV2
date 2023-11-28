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

    // propertyName: {
    // type: Schema.Types.String,
    // required: true,
    // index: {
    //   name: 'text',
    //   default_language: 'none',
    // },
    // },

    zipcode: Schema.Types.Number,

    pathroomCnt: {
      type: Schema.Types.Number,
      default: 0,
    },
    roomCnt: Schema.Types.Number,

    guestNum: {
      type: Schema.Types.Number,
      required: true,
      index: true,
    },

    pricePerNight: Schema.Types.Number,

    cleaningFee: Schema.Types.Number,

    checkInTime: {
      type: Schema.Types.Date,
      default: null,
      index: true,
    },

    checkOutTime: {
      type: Schema.Types.Date,
      default: null,
      index: true,
    },

    isRefundable: Schema.Types.String,

    cancellationPeriod: Schema.Types.Number,

    cancellationType: Schema.Types.String,

    refundRate: Schema.Types.Number,

    numOfRatings: {
      type: Schema.Types.Number,
      default: 0,
    },
    avgRatings: {
      type: Schema.Types.Number,
      default: 0,
    },

    street: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },

    city: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },

    stateofResidence: Schema.Types.String,

    country: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },

    taxRate: Schema.Types.Number,

    // isDraft: { type: Schema.Types.Boolean, default: true, index: true, select: false }, // select: khi document.find or findOne se loai cai nay ra neu false
    // isPublished: { type: Schema.Types.Boolean, default: false, index: true, select: false },
  },

  schemaOptions,
);

// lisingSchema.index({ _hostId: 1, _id: 1 });
// lisingSchema.index({ checkInTime: 1, checkOutTime: 1 });
// lisingSchema.index({ street: 'text', city: 'text', country: 'text' });
// lisingSchema.index({ street: 'text', city: 'text', country: 'text', checkInTime: 1, checkOutTime: 1 });

// Text index for full-text search
lisingSchema.index({
  propertyName: 'text',
  street: 'text',
  city: 'text',
  country: 'text',
});

// Compound index for filtering and sorting
lisingSchema.index({
  checkInTime: 1,
  checkOutTime: 1,
});

// Compound index for combined search criteria
lisingSchema.index({
  city: 1,
  country: 1,
  checkInTime: 1,
  checkOutTime: 1,
});

// Index for host-based searches
lisingSchema.index({
  _hostId: 1,
});

lisingSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, overrideMethods: 'all' });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Listing =
  (mongoose.models.Listing as mongoose.Model<ListingDBModel>) ||
  mongoose.model<ListingDBModel>('Listing', lisingSchema);
