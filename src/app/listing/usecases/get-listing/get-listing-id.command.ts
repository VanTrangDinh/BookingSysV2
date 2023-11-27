import { IsDefined, IsString } from 'class-validator';

import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';
import { BaseCommand } from '../../../shared/command/base.command';

export class GetListingByIdCommand extends BaseCommand {
  @IsString()
  @IsDefined()
  listingId: string;
}
