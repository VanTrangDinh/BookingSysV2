import { OrganizationEntity } from './../../../../dal/repositories/organization/organization.entity';

import { Injectable } from '@nestjs/common';
import { UserRegisterCommand } from './user-register.command';
import { normalizeEmail } from '../../../shared/helpers/email-normalization.service';
import { ApiException } from '../../../shared/exceptions/api.exception';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../../application-generic';
import { CreateOrganization } from '../../../organization/usecases/create-organization/create-organization.usecase';
import { CreateOrganizationCommand } from '../../../organization/usecases/create-organization/create-organization.command';
import { UserRepository } from '../../../../dal/infra/repositories/user.repository';

@Injectable()
export class UserRegister {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
    private createOrganizationUsecase: CreateOrganization,
  ) {}

  async execute(command: UserRegisterCommand) {
    const email = normalizeEmail(command.email);
    const existingUser = await this.userRepository.findByEmail(email);

    //with pg

    if (existingUser) throw new ApiException('User already exists');

    const passwordHash = await bcrypt.hash(command.password, 10);

    const user = await this.userRepository.create({
      email,
      phone: command.phone,
      firstName: command.firstName.toLowerCase(),
      lastName: command.lastName?.toLowerCase(),
      password: passwordHash,
    });

    return {
      user: await this.userRepository.findById(user.id),
      // token: await this.authService.generateUserToken(user),
    };
  }
}
