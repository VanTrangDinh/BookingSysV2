import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

import { schemaOptions } from '../schema-default.options';
import { AvailableBookingSlotDBModel } from './available-booking-slot.entity';

const availableBookingSlotSchema = new Schema<AvailableBookingSlotDBModel>(
  {
    _listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      index: true,
    },
    startDate: Schema.Types.Date,
    endDate: Schema.Types.Date,
  },
  schemaOptions,
);

availableBookingSlotSchema.index({
  _listingId: 1,
  _id: 1,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AvailableBookingSlot =
  (mongoose.models.AvailableBookingSlot as mongoose.Model<AvailableBookingSlotDBModel>) ||
  mongoose.model<AvailableBookingSlotDBModel>('AvailableBookingSlot', availableBookingSlotSchema);
