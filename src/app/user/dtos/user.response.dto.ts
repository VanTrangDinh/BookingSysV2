import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../../../dal/infra/entities';

export class ServicesHashesDto {
  @ApiProperty()
  intercom?: string;
}

export class UserResponseDto {
  @ApiProperty()
  _id: string;

  @ApiPropertyOptional()
  resetToken?: string;

  @ApiPropertyOptional()
  resetTokenDate?: string;

  @ApiProperty()
  firstName?: string | null;

  @ApiProperty()
  lastName?: string | null;

  @ApiProperty()
  email?: string | null;

  @ApiProperty()
  profilePicture?: string | null;

  @ApiProperty()
  createdAt: string;

  @ApiPropertyOptional()
  showOnBoarding?: boolean;

  @ApiProperty()
  servicesHashes?: ServicesHashesDto;
}

export class UserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class UserResponseDtoV2 extends UserDto {
  isAdmin?: boolean;
  createdAt?: Date;
  deletedAt?: Date | null;
  updatedAt?: Date;
}

export const mapSimpleUser = (entity: UserEntity): UserDto => {
  return {
    id: entity.id,
    email: entity.email,
    firstName: entity.firstName,
    lastName: entity.lastName,
  };
};

export function mapUser(entity: UserEntity): UserResponseDtoV2 {
  return {
    ...mapSimpleUser(entity),
    isAdmin: entity.isAdmin,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
