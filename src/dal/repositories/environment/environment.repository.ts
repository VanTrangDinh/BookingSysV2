import { BaseRepository } from '../base-repository';
import { EnvironmentDBModel, EnvironmentEntity, IApiKey } from './environment.entity';
import { Environment } from './environment.schema';

export class EnvironmentRepository extends BaseRepository<EnvironmentDBModel, EnvironmentEntity, object> {
  constructor() {
    super(Environment, EnvironmentEntity);
  }

  async findByApiKey(key: string) {
    return await this.findOne({
      'apiKeys.key': key,
    });
  }
}
