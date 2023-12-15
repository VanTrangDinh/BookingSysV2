import { Injectable, NotFoundException } from '@nestjs/common';
import { GetBookingsCommand } from './get-bookings.command';
import { BookingRepository, ListingRepository } from '../../../../dal';
import { CachedEntity, buildBookingsKey } from '../../../../application-generic';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

@Injectable()
export class GetBookings {
  constructor(
    private bookingRepository: BookingRepository,
    private listingRepository: ListingRepository,
  ) {}

  // @CachedEntity({
  //   builder: () => buildBookingsKey(),
  //   options: { ttl: WEEK_IN_SECONDS },
  // })
  async execute(command: GetBookingsCommand) {
    const foundListing = await this.listingRepository.findByListingId(command.listingId);

    if (!foundListing) throw new NotFoundException('Not found listing');

    const query = {
      _listingId: foundListing._id,
    };

    const totalCount = await this.bookingRepository.count(query);

    console.log({ totalCount });

    if (totalCount === 0) throw new NotFoundException('Dont have any booking information of listingId');

    const data = await this.bookingRepository.find(query, '', {
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
