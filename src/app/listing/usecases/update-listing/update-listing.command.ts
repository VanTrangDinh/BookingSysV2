import { IsDefined, IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';
import { CreateListingCommand } from '../create-listings/create-listing.command';

export class UpdateListingCommand extends CreateListingCommand {
  @IsDefined()
  @IsString()
  listingId: string;

  // @IsDefined()
  // @IsString()
  // _hostId: string;
}
