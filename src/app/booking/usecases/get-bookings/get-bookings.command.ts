import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';

export class GetBookingsCommand extends BaseCommand {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  hostId: string;
}
