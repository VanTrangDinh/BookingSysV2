import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async findById(userId: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async findByEmail(email: string, withPassword?: boolean): Promise<UserEntity | null> {
    /**
     * check cache for existing user entity
     * if not found , get from database and set value in cache
     * return user
     */
    let builder = this.userRepository.createQueryBuilder('user').where({ email });

    if (withPassword) {
      builder = builder.addSelect('user.password');
    }

    return builder.getOne();
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.save(user);
  }

  private async save(user: Partial<UserEntity>) {
    const { id } = await this.userRepository.save(user);
    return this.userRepository.findOneByOrFail({ id });
  }
}
