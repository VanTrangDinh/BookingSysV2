import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { UpdateListingAvailableCommand } from './update-listing-available.command';
import { InvalidateCacheService, buildListingKey } from '../../../../application-generic';

@Injectable()
export class UpdateListingAvailable {
  constructor(
    private listingRepository: ListingRepository,
    private invalidateCache: InvalidateCacheService,
  ) {}
  private getUpdatedFields(isAvailable: boolean) {
    return {
      isAvailable,
      ...(!isAvailable && { lastOnlineAt: new Date().toISOString() }),
    };
  }

  async execute(command: UpdateListingAvailableCommand) {
    const listing = await this.listingRepository.findByListingId(command.listingId, command.userId);

    if (!listing) throw new NotFoundException('Listing not found!');

    await this.invalidateCache.invalidateByKey({
      key: buildListingKey({
        listingId: command.listingId,
      }),
    });

    await this.listingRepository.update(
      {
        _id: command.listingId,
      },
      {
        $set: this.getUpdatedFields(command.isAvailable),
      },
    );
    return (await this.listingRepository.findById(command.listingId)) as ListingEntity;
  }
}
