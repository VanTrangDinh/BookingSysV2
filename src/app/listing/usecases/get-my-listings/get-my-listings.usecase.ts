import { Injectable } from '@nestjs/common';
import { ListingRepository } from '../../../../dal/repositories/listing';
import { GetListingsCommand } from './get-my-listings.command';

@Injectable()
export class GetByHostListings {
  constructor(private readonly listingRepository: ListingRepository) {}

  async execute(command: GetListingsCommand) {
    // const query: Partial<Omit<ListingEntity, 'transactionId'>> & { _hostId: string; transactionId?: string[] } = {
    //   _hostId: command.userId,
    // };

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
