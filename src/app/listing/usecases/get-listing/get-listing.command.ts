import { IsDefined, IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';
import { HostCommand } from '../../../shared/command/host.command';
import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class GetListingCommand extends AuthenticatedCommand {
  @IsString()
  @IsDefined()
  listingId: string;
}
