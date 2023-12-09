import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../../../../dal';
import { GetBookingDetailsCommand } from './get-booking-details.command';

@Injectable()
export class GetBookingDetails {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(command: GetBookingDetailsCommand) {
    const booking = await this.bookingRepository.findOne({
      _id: command.bookingId,
      _userId: command.userId,
    });

    if (!booking) throw new NotFoundException(`Not found ${command.bookingId}`);
    return booking;
  }
}
