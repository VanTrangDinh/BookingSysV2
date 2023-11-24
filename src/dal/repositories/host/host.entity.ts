import { Exclude } from 'class-transformer';

import { AuthProviderEnum } from '../../../shared';
import { ChangePropsValueType } from '../../types';
import { UserEntity } from '../user';

export class HostEntity {
  _id: string;

  _userId: string;

  user?: Pick<UserEntity, 'firstName' | '_id' | 'lastName' | 'email'>;

  IsSuperHost?: string;

  AvgRating: number;

  NumOfRatings: number;

  BankAccountNumber?: number;
}

export type HostDBModel = ChangePropsValueType<HostEntity, '_userId'>;
