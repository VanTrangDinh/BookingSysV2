import { SoftDeleteModel } from 'mongoose-delete';
import { FilterQuery } from 'mongoose';

import { BaseRepository } from '../base-repository';

import { ListingDBModel, ListingEntity } from './listing.entity';
import { Listing } from './listing.schema';

export class ListingRepository extends BaseRepository<ListingDBModel, ListingEntity, object> {
  constructor() {
    super(Listing, ListingEntity);
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
