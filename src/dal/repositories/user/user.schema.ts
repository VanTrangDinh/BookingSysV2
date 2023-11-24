import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { UserDBModel } from './user.entity';
import { schemaOptions } from '../schema-default.options';
import { UserRoleEnum } from '../../../shared';

const userSchema = new Schema<UserDBModel>(
  {
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: Schema.Types.String,
    phone: Schema.Types.String,
    isPhoneVerified: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    roles: {
      type: Schema.Types.String,
      enum: UserRoleEnum,
    },
    profilePicture: Schema.Types.String,
    resetToken: Schema.Types.String,
    resetTokenDate: Schema.Types.Date,
    resetTokenCount: {
      reqInMinute: Schema.Types.Number,
      reqInDay: Schema.Types.Number,
    },
    showOnBoarding: Schema.Types.Boolean,
    showOnBoardingTour: {
      type: Schema.Types.Number,
      default: 0,
    },
    tokens: [
      {
        providerId: Schema.Types.String,
        provider: Schema.Types.String,
        accessToken: Schema.Types.String,
        refreshToken: Schema.Types.String,
        valid: Schema.Types.Boolean,
        lastUsed: Schema.Types.Date,
        username: Schema.Types.String,
      },
    ],
    password: Schema.Types.String,
    failedLogin: {
      times: Schema.Types.Number,
      lastFailedAttempt: Schema.Types.Date,
    },
    servicesHashes: {
      intercom: Schema.Types.String,
    },
  },
  schemaOptions,
);

export const User =
  (mongoose.models.User as mongoose.Model<UserDBModel>) || mongoose.model<UserDBModel>('User', userSchema);
