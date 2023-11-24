import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  MinLength,
  Matches,
  MaxLength,
  IsString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { passwordConstraints } from '../../shared/helpers';

export class UserRegistrationBodyDto {
  @ApiProperty({
    required: true,
    description: 'Email for user',
    example: 'user@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'Password of the user',
    example: 'password123',
  })
  @IsDefined()
  // @MinLength(passwordConstraints.minLength)
  // @MaxLength(passwordConstraints.maxLength)
  // @Matches(passwordConstraints.pattern, {
  //   message:
  //     // eslint-disable-next-line max-len
  //     'The password must contain minimum 8 and maximum 64 characters, at least one uppercase letter, one lowercase letter, one number and one special character #?!@$%^&*()-',
  // })
  password: string;

  @ApiProperty({ required: true, description: 'Number phone of the user', example: 1234567890 })
  @IsDefined()
  phone: number;

  @ApiProperty({
    required: true,
    description: 'Firstname of the user',
    example: 'Messi',
  })
  @IsDefined()
  @IsString()
  firstName: string;

  @ApiPropertyOptional({
    description: 'Lastname of the user',
    example: 'Leo',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Name of the organization',
    example: 'BABAO',
  })
  @IsOptional()
  @IsString()
  organizationName: string;

  // @IsOptional()
  // @IsEnum(SignUpOriginEnum)
  // origin?: SignUpOriginEnum;
}
