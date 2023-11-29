import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsBoolean } from 'class-validator';

export class UpdateListingAvailableRequestDto {
  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isAvailable: boolean;
}
