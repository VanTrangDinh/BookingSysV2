import { Injectable } from '@nestjs/common';
import { GetBookingsCommand } from './get-bookings.command';
import { BookingRepository } from '../../../../dal';
import { CachedEntity, buildBookingsKey } from '../../../../application-generic';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

@Injectable()
export class GetBookings {
  constructor(private bookingRepository: BookingRepository) {}

  // @CachedEntity({
  //   builder: () => buildBookingsKey(),
  //   options: { ttl: WEEK_IN_SECONDS },
  // })
  async execute(command: GetBookingsCommand) {
    const query = {
      _hostId: command.hostId,
    };
    const totalCount = await this.bookingRepository.count(query);

    const data = await this.bookingRepository.findWithPopulate(
      query,
      '',
      {
        limit: command.limit,
        skip: command.page * command.limit,
      },
      [
        { path: 'listing', select: 'title', model: 'Listing' },
        { path: 'user', select: 'username', model: 'User' },
      ],
    );

    return {
      page: command.page,
      totalCount,
      hasMore: data?.length === command.limit,
      pageSize: command.limit,
      data,
    };
  }
}
