import { Injectable, NotFoundException } from '@nestjs/common';
import { InvalidateCacheService, buildListingKey } from '../../../../application-generic';
import { ListingRepository } from '../../../../dal/repositories/listing';
import { RemoveListingCommand } from './remove-listing.command';
import { ApiException } from '../../../shared/exceptions/api.exception';
import { DalException } from '../../../../dal/shared';

@Injectable()
export class RemoveListing {
  constructor(
    private invalidateCache: InvalidateCacheService,
    private listingRepository: ListingRepository,
  ) {}

  async execute(command: RemoveListingCommand) {
    try {
      const listing = await this.listingRepository.findOne(
        { _id: command.listingId, _hostId: command.userId },
        // { isAvailable: false },
      );

      if (!listing) {
        throw new NotFoundException(`Listing with id ${command.listingId} not found`);
      }

      if (!listing.isAvailable)
        throw new ApiException(
          `A listing already available, please change isAvailable to false for ${command.listingId}`,
        );

      //invalidate query

      // await this.invalidateCache.invalidateQuery({
      //   key: buildFeedKey().invalidate({
      //     subscriberId: message.subscriber.subscriberId,
      //     _environmentId: command.environmentId,
      //   }),
      // });

      await this.invalidateCache.invalidateByKey({
        key: buildListingKey({
          listingId: command.listingId,
        }),
      });

      await this.listingRepository.delete({ _id: command.listingId });
    } catch (error) {
      if (error instanceof DalException) {
        throw new ApiException(error.message);
      }
      throw error;
    }

    return {
      acknowledged: true,
      status: 'deleted',
    };
  }
}
