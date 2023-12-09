import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../../../../dal';
import { GetBookingDetailsCommand } from './get-booking-details.command';

@Injectable()
export class GetBookingDetails {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(command: GetBookingDetailsCommand) {
    return this.bookingRepository.findOne({ bookingId: command.bookingId });
  }
}
