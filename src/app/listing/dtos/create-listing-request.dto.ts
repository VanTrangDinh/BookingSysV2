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

  @ApiProperty()
  guestNum: number;

  @ApiProperty()
  pricePerNight: number;

  @ApiProperty()
  cleaningFee: number;

  @ApiProperty()
  created: string;

  @ApiProperty()
  checkInTime: Date;

  @ApiProperty()
  checkOutTime: Date;

  @ApiProperty()
  isRefundable: string;

  @ApiProperty()
  cancellationPeriod: number;

  @ApiProperty()
  cancellationType: string;

  @ApiProperty()
  refundRate: number;

  @ApiProperty()
  numOfRatings: number;

  @ApiProperty()
  avgRatings: number;

  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  stateofResidence: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  taxRate: number;
}
