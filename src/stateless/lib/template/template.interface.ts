export enum ChannelTypeEnum {
  EMAIL = 'email',
  SMS = 'sms',
  CHAT = 'chat',
  PUSH = 'push',
}

export interface IAttachmentOptions {
  mime: string;
  file: Buffer | null;
  name?: string;
  channels?: ChannelTypeEnum[];
}
