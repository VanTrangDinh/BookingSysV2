import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  // @ApiProperty({
  //   example:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRmMjlmNTU4YWIzNjU3OWY2NTFkNTIiLCJmaXJzdE5hbWUiOiJ0cmFuZyIsImxhc3ROYW1lIjoiZGluaCIsImVtYWlsIjoid29ya2R2dDgxMTIxMkBnbWFpbC5jb20iLCJpYXQiOjE2OTk3Nzg3ODgsImV4cCI6MTcwMjM3MDc4OCwiaXNzIjoiYWlyYm5iX2FwaSAifQ.qGhpTMUgQj1sOEadQhNLyaN5TOs5vxkQ1lLBmAqpzG0',
  // })
  data: string;
}
