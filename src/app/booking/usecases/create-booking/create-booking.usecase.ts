import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingCommand } from './create-booking.command';
import { AvailableBookingSlotRepository, BookingEntity, BookingRepository, ListingRepository } from '../../../../dal';

@Injectable()
export class CreateBooking {
  constructor(
    private availableBookingSlotRepository: AvailableBookingSlotRepository,
    private bookingRepository: BookingRepository,
    private listingRepository: ListingRepository,
  ) {}

  async execute(command: CreateBookingCommand): Promise<BookingEntity> {
    /* 
    
    The user's selected period:
    --------[---------]-------
    Booking no1 
    [-----]-------------------
    Booking no2
    --------------------[----]
    Booking no3
    -----[----]---------------
    Booking no4
    -----------[---]----------
    Booking no5
    ------[-------]-----------
    Booking no6
    --------------[--------]--
    Booking no7
    -----[----------------]---
    
    */

    if (command.checkInDate >= command.checkOutDate) {
      throw new BadRequestException(`Check in date  must be greater than or equal to check out date`);
    }
    const listingExists = await this.listingRepository.findOne({ _id: command._listingId });

    if (!listingExists) throw new BadRequestException(`Listing ${command._listingId} does not exist`);

    const existingSlot = await this.availableBookingSlotRepository.find({ _listingId: command._listingId });

    if (existingSlot) {
      const isListingAvailable = await this.availableBookingSlotRepository.bookingConflict({
        _listingId: command._listingId,
        checkInDate: command.checkInDate,
        checkOutDate: command.checkOutDate,
      });

      if (isListingAvailable > 0) {
        throw new BadRequestException('Accommodation is not available during this period.');
      } else {
        await this.availableBookingSlotRepository.create({
          _listingId: command._listingId,
          startDate: command.checkInDate,
          endDate: command.checkOutDate,
        });
      }
    } else {
      await this.availableBookingSlotRepository.create({
        _listingId: command._listingId,
        startDate: command.checkInDate,
        endDate: command.checkOutDate,
      });
    }

    return this.bookingRepository.create(command);
  }
}
