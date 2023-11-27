import { IsDefined, IsString } from 'class-validator';

import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class GetListingCommand extends AuthenticatedCommand {
  @IsString()
  @IsDefined()
  listingId: string;
}
