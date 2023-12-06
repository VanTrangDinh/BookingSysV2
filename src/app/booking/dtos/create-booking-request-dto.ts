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
  adultsGuestNum?: number;

  @ApiProperty()
  @Optional()
  childrenGuestNum?: number;

  @ApiProperty()
  infantsGuestNum?: number;

  @ApiProperty()
  petsNum?: number;

  @ApiProperty()
  @Optional()
  promoCode?: string;
}
