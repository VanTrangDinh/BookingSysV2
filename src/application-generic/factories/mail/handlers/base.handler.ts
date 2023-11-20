import { PlatformException } from '../../../../app/shared/utils';
import { ChannelTypeEnum, ICredentials } from '../../../../shared';
import {
  ICheckIntegrationResponse,
  IEmailOptions,
  IEmailProvider,
  ISendMessageSuccessResponse,
} from '../../../../stateless';
import { IMailHandler } from '../interface/send.handler.interface';

export abstract class BaseHandler implements IMailHandler {
  protected provider: IEmailProvider;

  protected constructor(
    private providerId: string,
    private channelType: string,
  ) {}

  canHandle(providerId: string, channelType: ChannelTypeEnum) {
    return providerId === this.providerId && channelType === this.channelType;
  }

  abstract buildProvider(credentials, options);

  async send(mailData: IEmailOptions): Promise<ISendMessageSuccessResponse> {
    if (process.env.NODE_ENV === 'test') {
      return {};
    }

    return await this.provider.sendMessage(mailData);
  }
  public getProvider(): IEmailProvider {
    return this.provider;
  }

  async check() {
    const mailData: IEmailOptions = {
      html: '<div>checking integration</div>',
      subject: 'Checking Integration',
      to: ['no-reply@novu.co'],
    };

    const { message, success, code } = await this.provider.checkIntegration(mailData);

    if (!success) {
      throw new PlatformException(
        JSON.stringify({
          success,
          code,
          message: message || 'Something went wrong! Please double check your account details(Email/API key)',
        }),
      );
    }

    return {
      success,
      code,
      message: 'Integration successful',
    };
  }
}
