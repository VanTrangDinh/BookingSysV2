import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { InvalidateCacheService, buildListingKey, buildListingsKey } from '../../../../application-generic';
import { UpdateListingCommand } from './update-listing.command';
import { IListingsDefine, ListingCustomData } from '../../../../shared';

@Injectable()
export class UpdateListing {
  constructor(
    private listingRepository: ListingRepository,
    private invalidateCache: InvalidateCacheService,
  ) {}

  async execute(command: UpdateListingCommand): Promise<ListingEntity> {
    const existingListing = await this.listingRepository.findByListingId(command.userId, command.listingId);

    if (!existingListing) {
      throw new NotFoundException(`ListingId: ${command.listingId}  not found`);
    }

    Object.keys(command).forEach((key) => {
      // Exclude specific keys
      if (key !== 'listingId' && key !== 'userId' && command[key] !== undefined) {
        existingListing[key] = command[key];
      }
    });

    const query = {
      _hostId: command.userId,
      _id: command.listingId,
    };

    const updateBody = existingListing;

    // await this.invalidateCache.invalidateByKey({
    //   key: buildListingsKey(),
    // });

    await this.invalidateCache.invalidateByKey({
      key: buildListingKey({
        listingId: command.listingId,
      }),
    });

    await this.listingRepository.update(query, updateBody);

    return await this.listingRepository.findByListingId(command.userId, command.listingId);
  }
}
