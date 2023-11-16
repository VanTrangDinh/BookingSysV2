import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class GetOrganizationCommand extends AuthenticatedCommand {
  public readonly id: string;
}
