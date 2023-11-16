import { IsDefined, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';
import { passwordConstraints } from '../../shared/helpers';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetBodyDto {
  @ApiProperty({
    required: true,
    description: 'Email of the user',
    example: 'user@example.com',
  })
  @IsDefined()
  // @MinLength(passwordConstraints.minLength)
  // @MaxLength(passwordConstraints.maxLength)
  // @Matches(passwordConstraints.pattern, {
  //   message:
  //     'The password must contain minimum 8 and maximum 64 characters, at least one uppercase letter, one lowercase letter, one number and one special character #?!@$%^&*()-',
  // })
  password: string;

  @ApiProperty({
    required: true,
    description: 'Token',
    example: '3eb4e860-d5af-448b-9b92-13163ec1757f',
  })
  @IsDefined()
  @IsUUID(4, {
    message: 'Bad token provided',
  })
  token: string;
}
