import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { BulkCreateListingsCommand } from './create-listing.command';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { ApiException } from '../../../shared/exceptions/api.exception';

@Injectable()
export class CreateListing {
  constructor(private listingRepository: ListingRepository) {}

  async execute(command: BulkCreateListingsCommand) {
    try {
      return await this.listingRepository.bulkCreateListings(command.listings);
    } catch (e) {
      throw new ApiException(e.message);
    }
  }

  // async execute(command: CreateListingCommand): Promise<ListingEntity> {
  //   //cache listing

  //   //check if have is host

  //   console.log(command.roles);

  //   if (!command.roles?.includes('host')) throw new UnauthorizedException('User not allowed to create listing');

  //   const listingExist = await this.listingRepository.findOne({
  //     propertyName: command.propertyName,
  //     _hostId: command.userId,
  //   });

  //   if (listingExist) {
  //     throw new ConflictException(`Listing with property name: ${command.propertyName} already exists`);
  //   }

  //   const listing = await this.listingRepository.create({
  //     _hostId: command.userId,
  //     propertyName: command.propertyName,
  //     zipcode: command.zipcode,
  //     pathroomCnt: command.pathroomCnt,
  //     roomCnt: command.roomCnt,
  //     guestNum: command.guestNum,
  //     pricePerNight: command.pricePerNight,
  //     cleaningFee: command.cleaningFee,
  //     isRefundable: command.isRefundable,
  //     cancellationPeriod: command.cancellationPeriod,
  //     street: command.street,
  //     city: command.city,
  //     country: command.country,
  //     taxRate: command.taxRate,
  //   });

  //   return listing;
  // }
}
