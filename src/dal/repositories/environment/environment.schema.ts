import mongoose, { Schema } from 'mongoose';
import { EnvironmentDBModel } from './environment.entity';
import { schemaOptions } from '../schema-default.options';

const environmentSchema = new Schema<EnvironmentDBModel>(
  {
    name: Schema.Types.String,
    identifier: {
      type: Schema.Types.String,
      unique: true,
    },
    _organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      index: true,
    },
    apiKeys: [
      {
        key: {
          type: Schema.Types.String,
          unique: true,
        },
        _userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    _parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Environment',
    },
  },
  schemaOptions,
);

export const Environment =
  (mongoose.models.Environment as mongoose.Model<EnvironmentDBModel>) ||
  mongoose.model<EnvironmentDBModel>('Environment', environmentSchema);
