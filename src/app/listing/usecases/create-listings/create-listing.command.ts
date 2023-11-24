import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';
import { BaseCommand } from '../../../shared/command/base.command';

export class CreateListingCommand extends BaseCommand {
  @IsString()
  propertyName: string;

  @IsNumber()
  @IsOptional()
  zipcode: number;

  @IsNumber()
  @IsOptional()
  pathroomCnt: number;

  @IsNumber()
  @IsOptional()
  roomCnt: number;

  @IsNumber()
  @IsOptional()
  guestNum: number;

  @IsNumber()
  @IsOptional()
  pricePerNight: number;

  @IsNumber()
  @IsOptional()
  cleaningFee: number;

  @IsDate()
  checkInTime: Date;

  @IsDate()
  checkOutTime: Date;

  @IsOptional()
  @IsString()
  isRefundable: string;

  @IsNumber()
  @IsOptional()
  cancellationPeriod: number;

  cancellationType: string;

  @IsNumber()
  @IsOptional()
  refundRate: number;

  @IsNumber()
  @IsOptional()
  numOfRatings: number;

  @IsNumber()
  @IsOptional()
  avgRatings: number;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  stateofResidence: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsNumber()
  @IsOptional()
  taxRate: number;
}
