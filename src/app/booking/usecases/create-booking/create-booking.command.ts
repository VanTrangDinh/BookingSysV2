import { IsString, IsOptional, IsNumber, IsDate, IsDefined, IsNotEmpty, IsBoolean } from 'class-validator';

import { AuthenticatedCommand } from '../../../shared/command/authenticated.command';

export class CreateBookingCommand extends AuthenticatedCommand {
  @IsString()
  _listingId: string;

  @IsDate()
  checkInDate: Date;

  @IsDate()
  checkOutDate: Date;

  @IsNumber()
  @IsOptional()
  adultsGuestNum?: number;

  @IsNumber()
  @IsOptional()
  childrenGuestNum?: number;

  @IsNumber()
  @IsOptional()
  infantsGuestNum?: number;

  @IsOptional()
  @IsNumber()
  petsNum?: number;

  @IsOptional()
  @IsString()
  promoCode?: string;

  // @IsDate()
  // bookingDate: Date;

  // @IsDate()
  // @IsOptional()
  // modifiedDate?: Date;

  // @IsNumber()
  // @IsOptional()
  // cleaningFee?: number;

  // @IsOptional()
  // @IsString()
  // isRefundable?: string;

  // @IsOptional()
  // @IsNumber()
  // amountPaid?: number;

  // @IsBoolean()
  // @IsOptional()
  // isCancelled?: boolean;

  // @IsOptional()
  // @IsNumber()
  // refundPaid?: number;

  // @IsOptional()
  // @IsDate()
  // cancelDate?: Date;

  // @IsNumber()
  // @IsOptional()
  // totalPrice?: number;

  // @IsNumber()
  // tax?: number;

  // @IsNumber()
  // totalPriceTax: number;

  // @IsNumber()
  // amountDue: number;

  // @IsNumber()
  // refundAmount: number;
}
