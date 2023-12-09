import { IsDefined, IsString } from 'class-validator';
import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class GetBookingDetailsCommand extends AuthenticatedCommand {
  @IsString()
  @IsDefined()
  bookingId: string;
}
