import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsDateString, IsOptional, MinDate } from 'class-validator';

export class SearchDto {
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
  // @IsOptional()
  // @IsDateString()
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MinDate(new Date())
  checkInTime: Date;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MinDate(new Date())
  checkOutTime: Date;

  @ApiProperty()
  @IsOptional()
  guestNum?: number;
}
