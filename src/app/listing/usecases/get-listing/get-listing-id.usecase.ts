import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { buildListingKey, CachedEntity } from '../../../../application-generic';
import { GetListingByIdCommand } from './get-listing-id.command';

@Injectable()
export class GetListingById {
  constructor(private readonly listingRepository: ListingRepository) {}

  async execute(command: GetListingByIdCommand): Promise<ListingEntity> {
    const { listingId } = command;

    const listing = await this.fetchListing({ listingId });

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
  private async fetchListing({ listingId }: { listingId: string }): Promise<ListingEntity | null> {
    return await this.listingRepository.findById(listingId);
  }
}
