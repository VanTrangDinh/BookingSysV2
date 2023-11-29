import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';
import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class UpdateListingAvailableCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsBoolean()
  isAvailable: boolean;

  @IsDefined()
  @IsString()
  listingId: string;
}
