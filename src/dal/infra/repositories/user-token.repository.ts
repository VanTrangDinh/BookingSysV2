import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTokenEntity } from '../entities';

@Injectable()
export class UserTokenRepository {
  constructor(@InjectRepository(UserTokenEntity) private repository: Repository<UserTokenEntity>) {}

  async create(userEntity: Partial<UserTokenEntity>): Promise<UserTokenEntity> {
    return this.repository.save(userEntity);
  }
}
