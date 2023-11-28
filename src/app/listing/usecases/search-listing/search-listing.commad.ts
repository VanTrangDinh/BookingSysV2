import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';

export class SearchCommand extends BaseCommand {
  // @IsDefined()
  // @IsString()
  // searchKey: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsDate()
  @IsOptional()
  checkInTime?: Date;

  @IsDate()
  @IsOptional()
  checkOutTime?: Date;

  @IsNumber()
  @IsOptional()
  guestNum?: number;
}
