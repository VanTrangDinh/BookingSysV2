import { Injectable } from '@nestjs/common';
import { SearchCommand } from './search-listing.commad';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';

@Injectable()
export class SearchListing {
  constructor(private listingRepository: ListingRepository) {}

  async execute(command: SearchCommand): Promise<ListingEntity[]> {
    return await this.listingRepository.searchListings(command);
  }
}
