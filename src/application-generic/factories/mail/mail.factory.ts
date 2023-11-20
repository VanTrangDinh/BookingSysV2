import { IntegrationEntity } from '../../../dal';
import { NodemailerHandler } from './handlers';
import { IMailHandler } from './interface/send.handler.interface';

export class MailFactory {
  handlers: IMailHandler[] = [new NodemailerHandler()];
  getHandlers(
    integration: Pick<IntegrationEntity, 'credentials' | 'channel' | 'providerId'>,
    from?: string,
  ): IMailHandler {
    const handler =
      this.handlers.find((handlerItem) => handlerItem.canHandle(integration.providerId, integration.channel)) ?? null;

    if (!handler) throw new Error('Handler for provider was not found');

    handler.buildProvider(integration.credentials, from);

    return handler;
  }
}
