import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';

export class CancelBookingCommand extends BaseCommand {
  @IsString()
  hostId: string;

  @IsString()
  bookingId: string;
}
