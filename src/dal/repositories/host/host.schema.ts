import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

import { schemaOptions } from '../schema-default.options';

import { HostDBModel } from './host.entity';

const hostSchema = new Schema<HostDBModel>(
  {
    _userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },

    IsSuperHost: Schema.Types.String,

    AvgRating: Schema.Types.Number,

    NumOfRatings: Schema.Types.Number,

    BankAccountNumber: Schema.Types.Number,
  },
  schemaOptions,
);

hostSchema.index({
  _userId: 1,
  email: 1,
});

hostSchema.index({
  _userId: 1,
  _id: 1,
});

hostSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, overrideMethods: 'all' });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Host =
  (mongoose.models.Host as mongoose.Model<HostDBModel>) || mongoose.model<HostDBModel>('Host', hostSchema);
