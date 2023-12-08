import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingCommand } from './create-booking.command';
import {
  AvailableBookingSlotRepository,
  BookingEntity,
  BookingRepository,
  ListingEntity,
  ListingRepository,
} from '../../../../dal';
import { getNumberOfDays } from '../../../shared/helpers/get-number-of-date-helper';

@Injectable()
export class CreateBooking {
  constructor(
    private availableBookingSlotRepository: AvailableBookingSlotRepository,
    private bookingRepository: BookingRepository,
    private listingRepository: ListingRepository,
  ) {}

  async execute(command: CreateBookingCommand): Promise<BookingEntity> {
    this.validateDates(command);
    const listing = await this.getListing(command._listingId);

    console.log({ listing });
    await this.checkAndCreateBookingSlot(command);

    const numberOfGuests = this.calculateTotalGuests(command);

    console.log({ numberOfGuests });
    const numberOfDays = this.calculateNumberOfDays(command.checkInDate, command.checkOutDate);

    console.log({ numberOfDays });

    const bookingCommand: BookingEntity = {
      ...command,
      bookingDate: new Date(),
      totalPrice: this.calculatePriceWithoutTax(listing.pricePerNight, numberOfDays, numberOfGuests),
      totalPriceTax: this.calculatePrice(listing.pricePerNight, listing.taxRate, numberOfDays, numberOfGuests),
      amountPaid: this.calculateTotalPrice(listing.pricePerNight, listing.taxRate, numberOfDays, numberOfGuests),
    };

    return this.bookingRepository.create(bookingCommand);
  }

  private validateDates(command: CreateBookingCommand): void {
    if (command.checkInDate >= command.checkOutDate) {
      throw new BadRequestException(`Check in date must be greater than or equal to check out date`);
    }
  }

  private async getListing(listingId: string): Promise<ListingEntity> {
    try {
      return (await this.listingRepository.findOne({ _id: listingId })) as ListingEntity;
    } catch (error) {
      throw new BadRequestException(`Listing ${listingId} does not exist`);
    }
  }

  private async checkAndCreateBookingSlot(command: CreateBookingCommand): Promise<void> {
    const existingSlot = await this.availableBookingSlotRepository.findOne({ _listingId: command._listingId });

    if (!existingSlot) {
      await this.availableBookingSlotRepository.create({
        _listingId: command._listingId,
        startDate: command.checkInDate,
        endDate: command.checkOutDate,
      });
    } else {
      const isListingAvailable = await this.availableBookingSlotRepository.bookingConflict({
        _listingId: command._listingId,
        checkInDate: command.checkInDate,
        checkOutDate: command.checkOutDate,
      });

      if (isListingAvailable > 0) {
        throw new BadRequestException('Accommodation is not available during this period.');
      }
    }
  }

  private calculateNumberOfDays(checkInDate: Date, checkOutDate: Date): number {
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
  }

  private calculateTotalGuests(command: CreateBookingCommand): number {
    const { adultsGuestNum, childrenGuestNum, infantsGuestNum, petsNum } = command;
    // const regularGuests = adultsGuestNum + childrenGuestNum;
    // return regularGuests + Math.min(infantsGuestNum, 0) + petsNum;

    const adults = adultsGuestNum !== undefined ? adultsGuestNum : 0;
    const children = childrenGuestNum !== undefined ? childrenGuestNum : 0;
    const infants = infantsGuestNum !== undefined ? infantsGuestNum : 0;
    const pets = petsNum !== undefined ? petsNum : 0;

    const regularGuests = adults + children;
    return regularGuests + Math.min(infants, 0) + pets;
  }

  private calculatePriceWithoutTax(price: number, numberOfDays: number, numberOfGuests: number): number {
    return price * numberOfDays * numberOfGuests;
  }

  private calculatePrice(price: number, taxRate: number, numberOfDays: number, numberOfGuests: number): number {
    return price * numberOfDays * (1 + taxRate / 100) * numberOfGuests;
  }

  private calculateTotalPrice(
    basePrice: number,
    taxRate: number,
    numberOfDays: number,
    numberOfGuests: number,
  ): number {
    const totalBasePrice = basePrice * numberOfDays * numberOfGuests;
    const totalTax = totalBasePrice * (taxRate / 100);
    return totalBasePrice + totalTax;
  }
}

// interface GuestNumbers {
//   adultsGuestNum?: number | any;
//   childrenGuestNum?: number | any;
//   infantsGuestNum?: number | any;
//   petsNum?: number | any;
// }

// @Injectable()
// export class CreateBooking {
//   constructor(
//     private availableBookingSlotRepository: AvailableBookingSlotRepository,
//     private bookingRepository: BookingRepository,
//     private listingRepository: ListingRepository,
//   ) {}

//   async execute(command: CreateBookingCommand): Promise<BookingEntity> {
//     /*

//     The user's selected period:
//     --------[---------]-------
//     Booking no1
//     [-----]-------------------
//     Booking no2
//     --------------------[----]
//     Booking no3
//     -----[----]---------------
//     Booking no4
//     -----------[---]----------
//     Booking no5
//     ------[-------]-----------
//     Booking no6
//     --------------[--------]--
//     Booking no7
//     -----[----------------]---

//     */

//     //check available of listings

//     if (command.checkInDate >= command.checkOutDate) {
//       throw new BadRequestException(`Check in date  must be greater than or equal to check out date`);
//     }
//     const listingExists = await this.listingRepository.findOne({ _id: command._listingId });

//     if (!listingExists) throw new BadRequestException(`Listing ${command._listingId} does not exist`);

//     const existingSlot = await this.availableBookingSlotRepository.find({ _listingId: command._listingId });

//     if (existingSlot) {
//       const isListingAvailable = await this.availableBookingSlotRepository.bookingConflict({
//         _listingId: command._listingId,
//         checkInDate: command.checkInDate,
//         checkOutDate: command.checkOutDate,
//       });

//       if (isListingAvailable > 0) {
//         throw new BadRequestException('Accommodation is not available during this period.');
//       } else {
//         await this.availableBookingSlotRepository.create({
//           _listingId: command._listingId,
//           startDate: command.checkInDate,
//           endDate: command.checkOutDate,
//         });
//       }
//     } else {
//       await this.availableBookingSlotRepository.create({
//         _listingId: command._listingId,
//         startDate: command.checkInDate,
//         endDate: command.checkOutDate,
//       });
//     }

//     //check PromoCode

//     //calculate of the cost and tax

//     const { taxRate, pricePerNight } = listingExists;

//     console.log({ listingExists });

//     const numberOfGeust: number = await this.calculateTotalGuests({
//       adultsGuestNum: command.adultsGuestNum,
//       childrenGuestNum: command.childrenGuestNum,
//       infantsGuestNum: command.infantsGuestNum,
//       petsNum: command.petsNum,
//     });

//     const bookingCommand: BookingEntity = {
//       checkInDate: command.checkInDate,
//       checkOutDate: command.checkOutDate,
//       bookingDate: new Date(),
//       adultsGuestNum: command.adultsGuestNum,
//       childrenGuestNum: command.childrenGuestNum,
//       infantsGuestNum: command.infantsGuestNum,
//       petsNum: command.petsNum,
//       promoCode: command.promoCode,
//       _userId: command.userId,
//       _listingId: command._listingId,
//       totalPrice: await this.calculatePriceWithoutTax(
//         pricePerNight,
//         command.checkInDate,
//         command.checkOutDate,
//         numberOfGeust,
//       ),
//       totalPriceTax: await this.calculatePrice(
//         pricePerNight,
//         command.checkInDate,
//         command.checkOutDate,
//         taxRate,
//         numberOfGeust,
//       ),
//       amountPaid: await this.calculateTotalPrice(
//         pricePerNight,
//         command.checkInDate,
//         command.checkOutDate,
//         numberOfGeust,
//         taxRate,
//         0,
//       ),
//     };

//     console.log(bookingCommand);

//     return this.bookingRepository.create(bookingCommand);
//   }

//   async calculateTotalGuests(guestNumbers: GuestNumbers): Promise<number> {
//     const { adultsGuestNum, childrenGuestNum, infantsGuestNum, petsNum } = guestNumbers;

//     // Số lượng người lớn và trẻ em tính là người thường
//     const regularGuests = adultsGuestNum + childrenGuestNum;

//     // Số lượng khách cuối cùng bằng tổng số người thường, số trẻ em dưới 2 tuổi không được tính là một khách, và số thú cưng
//     const totalGuests = regularGuests + Math.min(infantsGuestNum, 0) + petsNum;

//     return totalGuests;
//   }

//   async calculatePriceWithoutTax(
//     price: number,
//     checkInDate: Date,
//     checkOutDate: Date,
//     numberGuest: number,
//   ): Promise<number> {
//     // Tính số ngày ở dựa trên check-in và check-out date
//     const numberOfDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));

//     // Tính tổng giá cả không áp dụng thuế
//     const totalPrice = price * numberOfDays * numberGuest;

//     return totalPrice;
//   }

//   async calculatePrice(
//     price: number,
//     checkInDate: Date,
//     checkOutDate: Date,
//     taxRate: number,
//     numberGuest: number,
//   ): Promise<number> {
//     // Tính số ngày ở dựa trên check-in và check-out date
//     const numberOfDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));

//     // Áp dụng thuế nếu có
//     // const taxRate = applyTax ? 0.1 : 0; // Thay đổi giá trị thuế theo yêu cầu của bạn
//     // const totalPrice = price * numberOfDays * (1 + taxRate);

//     const totalPrice = price * numberOfDays * (1 + taxRate) * numberGuest;

//     return totalPrice;
//   }

//   async calculateTotalPrice(
//     basePrice: number,
//     checkInDate: Date,
//     checkOutDate: Date,
//     guests: number,
//     taxRate: number,
//     serviceFee: number,
//     promoCodeDiscount: number = 0,
//   ): Promise<number> {
//     // Tính số ngày ở dựa trên check-in và check-out date
//     const numberOfDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));

//     // Tính tổng giá cả không áp dụng thuế và phí dịch vụ
//     const totalBasePrice = basePrice * numberOfDays * guests;

//     // Tính toán giá cuối cùng sau khi áp dụng thuế, phí dịch vụ và promo code
//     const totalTax = totalBasePrice * (taxRate / 100);
//     const totalServiceFee = serviceFee * numberOfDays * guests;
//     const totalDiscount = totalBasePrice * (promoCodeDiscount / 100);

//     const finalPrice = totalBasePrice + totalTax + totalServiceFee - totalDiscount;

//     return finalPrice;
//   }
// }
