import { ChangePropsValueType } from '../../types';
import { EnvironmentId } from '../environment';
import { OrganizationId } from '../organization';
import { LogCodeEnum, LogStatusEnum } from './../../../shared';
export class LogEntity {
  _id: string;

  transactionId: string;

  text: string;

  code: LogCodeEnum;

  // eslint-disable-next-line
  raw: any;

  status: LogStatusEnum;

  createdAt: string;

  _messageId: string;

  _notificationId: string;

  _subscriberId: string;

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;
}

export type LogDBModel = ChangePropsValueType<
  Omit<LogEntity, 'createdAt'>,
  '_messageId' | '_subscriberId' | '_notificationId' | '_organizationId' | '_environmentId'
> & {
  createdAt: Date;
};
