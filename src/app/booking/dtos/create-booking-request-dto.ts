import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateBookingRequestDto {
  @ApiProperty()
  _listingId: string;

  @ApiProperty()
  checkInDate: Date;

  @ApiProperty()
  checkOutDate: Date;

  @ApiProperty()
  @IsOptional()
  amountPaid?: number;

  @ApiProperty()
  adultsGuestNum?: number;

  @ApiProperty()
  cleaningFee?: number;

  @ApiProperty()
  @Optional()
  childrenGuestNum?: number;

  @ApiProperty()
  infantsGuestNum?: number;

  @ApiProperty()
  petsNum?: number;

  @ApiProperty()
  isCancelled?: boolean;

  @ApiProperty()
  @Optional()
  refundPaid?: number;

  @ApiProperty()
  @Optional()
  cancelDate?: Date;

  @ApiProperty()
  @Optional()
  promoCode?: string;

  // @ApiProperty()
  // @Optional()
  // totalPrice?: number;

  @ApiProperty()
  @Optional()
  tax?: number;

  // @ApiProperty()
  // totalPriceTax: number;

  // @ApiProperty()
  // amountDue: number;

  // @ApiProperty()
  // refundAmount: number;
}
