import { IsString, IsOptional, IsNumber, IsDate, IsDefined, IsNotEmpty, IsBoolean } from 'class-validator';

import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class CreateBookingCommand extends AuthenticatedCommand {
  @IsString()
  _listingId: string;

  @IsDate()
  checkInDate: Date;

  @IsDate()
  checkOutDate: Date;

  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsDate()
  bookingDate?: Date;

  @IsDate()
  modifiedDate?: Date;

  @IsNumber()
  @IsOptional()
  adultsGuestNum?: number;

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
  childrenGuestNum?: number;

  // cancellationType: string;

  @IsNumber()
  @IsOptional()
  infantsGuestNum?: number;

  @IsOptional()
  @IsNumber()
  petsNum?: number;

  @IsBoolean()
  @IsOptional()
  isCancelled?: boolean;

  @IsOptional()
  @IsNumber()
  refundPaid?: number;

  @IsOptional()
  @IsDate()
  cancelDate?: Date;

  @IsOptional()
  @IsString()
  promoCode?: string;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @IsNumber()
  tax?: number;

  @IsNumber()
  totalPriceTax: number;

  @IsNumber()
  amountDue: number;

  @IsNumber()
  refundAmount: number;
}
