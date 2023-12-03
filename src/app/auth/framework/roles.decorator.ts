import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../../shared';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// import { SetMetadata } from "@nestjs/common";
// import { UserRoles } from "@eats/types";

export const RoleAllowed = (...role: UserRoleEnum[]) => SetMetadata('roles', role);
