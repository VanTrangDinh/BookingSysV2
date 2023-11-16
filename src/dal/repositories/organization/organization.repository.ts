import { BaseRepository } from '../base-repository';
import { OrganizationDBModel, OrganizationEntity } from './organization.entity';
import { Organization } from './organization.schema';

export class OrganizationRepository extends BaseRepository<OrganizationDBModel, OrganizationEntity, object> {
  constructor() {
    super(Organization, OrganizationEntity);
  }

  async findById(id: string, select?: string): Promise<OrganizationEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }
}
