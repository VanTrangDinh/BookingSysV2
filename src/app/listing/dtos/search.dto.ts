import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class SearchDto {
  // @ApiProperty()
  // @IsOptional()
  // search: string;

  // @ApiProperty()
  // @IsOptional()
  // searchKey: string;

  @ApiProperty()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsOptional()
  street?: string;

  @ApiProperty()
  @IsOptional()
  country?: string;

  @ApiProperty()
  @IsOptional()
  checkInTime: Date | string;

  @ApiProperty()
  @IsOptional()
  checkOutTime: Date | string;

  @ApiProperty()
  @IsOptional()
  guestNum?: number;
}
