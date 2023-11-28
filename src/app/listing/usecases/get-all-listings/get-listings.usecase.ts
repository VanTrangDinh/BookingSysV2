import { Injectable } from '@nestjs/common';
import { ListingRepository } from '../../../../dal/repositories/listing';
import { CachedEntity, buildListingsKey } from '../../../../application-generic';
import { GetAllListingsCommand } from './get-listings.command';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

@Injectable()
export class GetListings {
  constructor(private listingRepository: ListingRepository) {}

  @CachedEntity({
    builder: () => buildListingsKey(),
    options: { ttl: WEEK_IN_SECONDS },
  })
  async execute(command: GetAllListingsCommand) {
    const query = {};
    const totalCount = await this.listingRepository.count(query);

    // const options = {
    //   limit: command.limit,
    //   skip: command.page * command.limit,
    // };
    const data = await this.listingRepository.findAll({ limit: command.limit, skip: command.page * command.limit });

    // const data = await this.listingRepository.find(query, {
    // limit: command.limit,
    // skip: command.page * command.limit,
    // });

    return {
      page: command.page,
      totalCount,
      hasMore: data?.length === command.limit,
      pageSize: command.limit,
      data,
    };
  }
}
