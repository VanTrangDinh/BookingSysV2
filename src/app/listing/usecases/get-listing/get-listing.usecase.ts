import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { GetListingCommand } from './get-listing.command';
import { buildListingKey, CachedEntity } from '../../../../application-generic';

@Injectable()
export class GetListing {
  constructor(private readonly listingRepository: ListingRepository) {}

  async execute(command: GetListingCommand): Promise<ListingEntity> {
    const { listingId, userId } = command;

    const listing = await this.fetchListing({ listingId, hostId: userId });

    if (!listing) {
      throw new NotFoundException(`Listing not found for id ${listingId}`);
    }

    return listing;
  }

  @CachedEntity({
    builder: (command: { listingId: string }) =>
      buildListingKey({
        listingId: command.listingId,
      }),
  })
  private async fetchListing({
    listingId,
    hostId,
  }: {
    listingId: string;
    hostId: string;
  }): Promise<ListingEntity | null> {
    return await this.listingRepository.findById(listingId);
  }
}
