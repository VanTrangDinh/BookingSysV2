import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateListingRequestDto {
  @ApiProperty()
  propertyName: string;

  @ApiProperty()
  zipcode: number;

  @ApiProperty()
  pathroomCnt: number;

  @ApiProperty()
  roomCnt: number;

  @Optional()
  @ApiProperty()
  guestNum: number;

  @Optional()
  @ApiProperty()
  pricePerNight: number;

  @Optional()
  @ApiProperty()
  cleaningFee: number;

  @Optional()
  @ApiProperty()
  checkInTime: Date;

  @ApiProperty()
  @Optional()
  checkOutTime: Date;

  @ApiProperty()
  @Optional()
  isRefundable: string;

  @Optional()
  @ApiProperty()
  cancellationPeriod: number;

  @Optional()
  @ApiProperty()
  cancellationType: string;

  @Optional()
  @ApiProperty()
  refundRate: number;

  @Optional()
  @ApiProperty()
  numOfRatings: number;

  @Optional()
  @ApiProperty()
  avgRatings: number;

  @Optional()
  @ApiProperty()
  street: string;

  @Optional()
  @ApiProperty()
  city: string;

  // @Optional()
  // @ApiProperty()
  // stateofResidence: string;

  @Optional()
  @ApiProperty()
  country: string;

  @Optional()
  @ApiProperty()
  taxRate: number;
}
