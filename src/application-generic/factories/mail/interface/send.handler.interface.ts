import { ChannelTypeEnum, ICredentials } from '../../../../shared';
import {
  ICheckIntegrationResponse,
  IEmailOptions,
  IEmailProvider,
  ISendMessageSuccessResponse,
} from '../../../../stateless';

export interface IMailHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials, from?: string);

  send(mailData: IEmailOptions): Promise<ISendMessageSuccessResponse>;

  getProvider(): IEmailProvider;

  check(): Promise<ICheckIntegrationResponse>;
}
