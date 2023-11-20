import { ChannelTypeEnum, IAttachmentOptions } from './../template/template.interface';
import { CheckIntegrationResponseEnum } from './provider.enum';

export interface IProvider {
  id: string;
  channelType: ChannelTypeEnum;
}

export interface IEmailOptions {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  attachments?: IAttachmentOptions[];
  id?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  payloadDetails?: any;
  notificationDetails?: any;
  ipPoolName?: string;
  customData?: Record<string, any>;
}

export interface ISendMessageSuccessResponse {
  id?: string;
  ids?: string[];
  date?: string;
}

export enum EmailEventStatusEnum {
  OPENED = 'opened',
  REJECTED = 'rejected',
  SENT = 'sent',
  DEFERRED = 'deferred',
  DELIVERED = 'delivered',
  BOUNCED = 'bounced',
  DROPPED = 'dropped',
  CLICKED = 'clicked',
  BLOCKED = 'blocked',
  SPAM = 'spam',
  UNSUBSCRIBED = 'unsubscribed',
  DELAYED = 'delayed',
  COMPLAINT = 'complaint',
}

export interface IEventBody {
  status: EmailEventStatusEnum;
  data: string;
  externalId?: string;
  attempts?: string;
  response?: string;
  row?: string;
}

export interface IEmailEventBody extends IEventBody {
  status: EmailEventStatusEnum;
}

export interface ICheckIntegrationResponse {
  success: boolean;
  message: string;
  code: CheckIntegrationResponseEnum;
}

export interface ICheckIntegrationResponse {
  success: boolean;
  message: string;
  code: CheckIntegrationResponseEnum;
}

export interface IEmailProvider extends IProvider {
  channelType: ChannelTypeEnum.EMAIL;

  sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;

  getMessageId?: (body: any | any[]) => string[];

  parseEventBody?: (body: any | any[], identifier: string) => IEmailEventBody | undefined;

  checkIntegration(options: IEmailOptions): Promise<ICheckIntegrationResponse>;
}
