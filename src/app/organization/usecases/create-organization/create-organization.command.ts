import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class CreateOrganizationCommand extends AuthenticatedCommand {
  public readonly logo?: string;

  public readonly name: string;
}
