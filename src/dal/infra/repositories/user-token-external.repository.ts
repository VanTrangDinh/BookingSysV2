import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTokenEntity, UserTokenExternalEntity } from '../entities';

@Injectable()
export class UserTokenRepository {
  constructor(@InjectRepository(UserTokenExternalEntity) private repository: Repository<UserTokenExternalEntity>) {}
}
