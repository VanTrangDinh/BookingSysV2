import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingCommand } from './create-booking.command';
import { BookingEntity, BookingRepository } from '../../../../dal';

@Injectable()
export class CreateBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(command: CreateBookingCommand): Promise<BookingEntity> {
    const isListingAvailable = await this.bookingRepository.isListingAvailable(
      command._listingId,
      command.checkInDate,
      command.checkOutDate,
    );

    if (!isListingAvailable) {
      throw new BadRequestException('Accommodation is not available during this period.');
      // Xử lý khi chỗ ở không khả dụng
      // throw new Error('Chỗ ở không khả dụng trong khoảng thời gian này.');
    }

    return this.bookingRepository.create(command);
  }
}
