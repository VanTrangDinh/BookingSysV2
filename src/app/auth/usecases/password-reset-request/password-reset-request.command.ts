import { IsDefined, IsEmail } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';

export class PasswordResetRequestCommand extends BaseCommand {
  @IsEmail()
  @IsDefined()
  email: string;
}
