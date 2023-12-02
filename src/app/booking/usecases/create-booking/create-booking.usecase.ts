import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingCommand } from './create-booking.command';
import { BookingRepository } from '../../../../dal';

@Injectable()
export class CreateBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(command: CreateBookingCommand) {
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

    if (command.promoCode) {
      const isValidPromoCode = await this.bookingRepository.isValidPromoCode(command.promoCode);

      if (!isValidPromoCode) {
        // Xử lý khi mã giảm giá không hợp lệ
        throw new Error('Mã giảm giá không hợp lệ.');
      }
    }
  }
}
