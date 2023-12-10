import { IsString } from 'class-validator';
import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class ConfirmBookingCommand extends AuthenticatedCommand {
  @IsString()
  token: string;
}
