// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
// import { GetListingCommand } from './get-listing.command';
// import { buildListingKey, CachedEntity } from '../../../../application-generic';

// @Injectable()
// export class GetListingByHost {
//   constructor(private readonly listingRepository: ListingRepository) {}

//   async execute(command: GetListingCommand): Promise<ListingEntity | null> {
//     const { listingId, userId } = command;

//     console.log({ listingId, userId });

//     const listing = await this.fetchListing(listingId, userId);

//     if (!listing) {
//       throw new NotFoundException(`Listing not found for id ${listingId}`);
//     }

//     return listing;
//   }

//   // @CachedEntity({
//   //   builder: (command: { listingId: string }) =>
//   //     buildListingKey({
//   //       listingId: command.listingId,
//   //     }),
//   // })
//   private async fetchListing(listingId: string, _hostId: string): Promise<ListingEntity | null> {
//     return await this.listingRepository.findByListingId(listingId, _hostId);
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { GetListingCommand } from './get-listing.command';
import { buildListingKey, CachedEntity } from '../../../../application-generic';

@Injectable()
export class GetListingByHost {
  constructor(private readonly listingRepository: ListingRepository) {}

  async execute(command: GetListingCommand): Promise<ListingEntity> {
    const { listingId } = command;

    const listing = await this.fetchListing({ listingId });

    if (!listing) {
      throw new NotFoundException(`Listing not found for id ${listingId}`);
    }

    return listing;
  }

  // @CachedEntity({
  //   builder: (command: { listingId: string }) =>
  //     buildListingKey({
  //       listingId: command.listingId,
  //     }),
  // })
  private async fetchListing({ listingId }: { listingId: string }): Promise<ListingEntity | null> {
    return await this.listingRepository.findByListingId(listingId);
  }
}
