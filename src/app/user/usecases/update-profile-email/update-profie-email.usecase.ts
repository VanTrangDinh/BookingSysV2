import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InvalidateCacheService, buildUserKey } from '../../../../application-generic';
import { UserRepository } from '../../../../dal';

import { normalizeEmail } from '../../../shared/helpers';
import { UpdateProfileEmailCommand } from './update-profile-email.command';

@Injectable()
export class UpdateProfileEmail {
  constructor(
    private invalidateCache: InvalidateCacheService,
    private userRepository: UserRepository,
  ) {}

  async execute(command: UpdateProfileEmailCommand) {
    const email = normalizeEmail(command.email);
    const user = await this.userRepository.findByEmail(email);

    if (user) throw new BadRequestException('E-mail is invalid or taken');

    await this.userRepository.update(
      {
        _id: command.userId,
      },
      {
        $set: {
          email,
        },
      },
    );

    await this.invalidateCache.invalidateByKey({
      key: buildUserKey({
        _id: command.userId,
      }),
    });

    const updatedUser = await this.userRepository.findById(command.userId);
    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }
}
