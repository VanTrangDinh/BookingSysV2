import { ConflictException, Injectable } from '@nestjs/common';
import { ListingRepository } from '../../../../../dist/main';
import { CreateListingCommand } from './create-listing.command';
import { ListingEntity } from '../../../../dal/repositories/listing';

@Injectable()
export class CreateListing {
  constructor(private listingRepository: ListingRepository) {}

  async execute(command: CreateListingCommand): Promise<ListingEntity> {
    // const feedExist = await this.listingRepository.findOne({
    //   _environmentId: command.environmentId,
    //   identifier: command.name,
    // });

    // if (feedExist) {
    //   throw new ConflictException(`Feed with identifier: ${command.name} already exists`);
    // }

    const item = await this.listingRepository.create({
      // _environmentId: command.environmentId,
      // _organizationId: command.organizationId,
      // name: command.name,
      // identifier: command.name,
    });

    // await this.createChange.execute(
    //   CreateChangeCommand.create({
    //     item,
    //     type: ChangeEntityTypeEnum.FEED,
    //     changeId: FeedRepository.createObjectId(),
    //     environmentId: command.environmentId,
    //     organizationId: command.organizationId,
    //     userId: command.userId,
    //   }),
    // );

    return item;
  }
}
