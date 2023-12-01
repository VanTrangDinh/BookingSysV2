import { IsDefined, IsEmail } from 'class-validator';
import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class UpdateProfileEmailCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsEmail()
  email: string;
}
