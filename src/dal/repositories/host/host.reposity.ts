import { SoftDeleteModel } from 'mongoose-delete';
import { FilterQuery } from 'mongoose';

import { BaseRepository } from '../base-repository';
import { DalException } from '../../shared';

import { HostDBModel, HostEntity } from './host.entity';
import { Host } from './host.schema';

export class HostRepository extends BaseRepository<HostDBModel, HostEntity, object> {
  constructor() {
    super(Host, HostEntity);
  }

  // async addHost(userId: string, member: IAddMemberData): Promise<void> {
  //   await this.create({
  //     _userId: member._userId,
  //     roles: member.roles,
  //     invite: member.invite,
  //     memberStatus: member.memberStatus,
  //     _organizationId: organizationId,
  //   });
  // }
}
