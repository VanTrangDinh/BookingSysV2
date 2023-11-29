import { IsString, IsOptional, IsNumber, IsDate, IsDefined, IsNotEmpty } from 'class-validator';

import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';
import { Transform } from 'class-transformer';

export class CreateListingCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsString()
  @IsOptional()
  propertyName?: string;

  @IsDefined()
  @IsOptional()
  zipcode?: number;

  @IsOptional()
  @IsNumber()
  pathroomCnt?: number;

  @IsOptional()
  roomCnt?: number;

  @IsOptional()
  @IsNumber()
  guestNum?: number;

  @IsNumber()
  @IsOptional()
  pricePerNight?: number;

  @IsNumber()
  @IsOptional()
  cleaningFee?: number;

  @IsOptional()
  @IsDate()
  checkInTime?: Date;

  @IsOptional()
  @IsDate()
  checkOutTime?: Date;

  @IsOptional()
  @IsString()
  isRefundable?: string;

  @IsNumber()
  @IsOptional()
  cancellationPeriod?: number;

  // cancellationType: string;

  @IsNumber()
  @IsOptional()
  refundRate?: number;

  @IsOptional()
  @IsNumber()
  numOfRatings?: number;

  @IsNumber()
  @IsOptional()
  avgRatings?: number;

  @IsOptional()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  // @IsOptional()
  // @IsString()
  // stateofResidence: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsNumber()
  @IsOptional()
  taxRate?: number;
}

// import { IsArray, ValidateNested } from 'class-validator';
// import { CreateListingRequestDto } from '../../dtos';
// import { BaseCommand } from '../../../shared/command/base.command';

// export class BulkCreateListingsCommand extends BaseCommand {
//   @IsArray()
//   @ValidateNested()
//   listings: CreateListingRequestDto[];
// }
