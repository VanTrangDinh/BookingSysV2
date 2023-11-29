import { IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';
import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class RemoveListingCommand extends AuthenticatedCommand {
  @IsString()
  listingId: string;
}
