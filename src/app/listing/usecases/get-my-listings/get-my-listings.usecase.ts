import { Injectable } from '@nestjs/common';
import { ListingRepository } from '../../../../dal/repositories/listing';
import { GetListingsCommand } from './get-my-listings.command';
import { CachedEntity, buildListingsKeyByHost } from '../../../../application-generic';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

@Injectable()
export class GetListingsByHost {
  constructor(private readonly listingRepository: ListingRepository) {}

  @CachedEntity({
    builder: () => buildListingsKeyByHost(),
    options: { ttl: WEEK_IN_SECONDS },
  })
  async execute(command: GetListingsCommand) {
    const query = {
      _hostId: command.userId,
    };

    const totalCount = await this.listingRepository.count(query);

    const data = await this.listingRepository.find(query, '', {
      limit: command.limit,
      skip: command.page * command.limit,
    });

    return {
      page: command.page,
      totalCount,
      hasMore: data?.length === command.limit,
      pageSize: command.limit,
      data,
    };
  }
}
