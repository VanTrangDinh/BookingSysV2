import { IsNotEmpty } from 'class-validator';
import { AuthenticatedCommand } from './authenticated.command';
import { BaseCommand } from './base.command';

export abstract class HostCommand extends AuthenticatedCommand {
  // @IsNotEmpty()
  // readonly environmentId: string;
  // @IsNotEmpty()
  // readonly organizationId: string;
}
