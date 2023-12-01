import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ListingEntity, ListingRepository } from '../../../../dal/repositories/listing';
import { CreateListingCommand } from './create-listing.command';
import { CachedEntity, InvalidateCacheService, buildListingsKey } from '../../../../application-generic';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

@Injectable()
export class CreateListing {
  constructor(
    private invalidateCache: InvalidateCacheService,
    private listingRepository: ListingRepository,
  ) {}

  async execute(command: CreateListingCommand): Promise<ListingEntity | any> {
    let listings = await this.fetchLisitngs();

    if (listings) {
      await this.invalidateCache.invalidateByKey({
        key: buildListingsKey(),
      });

      // if (!command.roles?.includes('host')) throw new UnauthorizedException('User not allowed to create listing');
      const listingExist = await this.listingRepository.findOne({
        propertyName: command.propertyName,
        _hostId: command.userId,
      });
      if (listingExist) {
        throw new ConflictException(`Listing with property name: ${command.propertyName} already exists`);
      }

      const listingPayload = {
        _hostId: command.userId,
        propertyName: command.propertyName,
        zipcode: command.zipcode,
        pathroomCnt: command.pathroomCnt,
        roomCnt: command.roomCnt,
        guestNum: command.guestNum,
        pricePerNight: command.pricePerNight,
        cleaningFee: command.cleaningFee,
        isRefundable: command.isRefundable,
        cancellationPeriod: command.cancellationPeriod,
        street: command.street,
        city: command.city,
        country: command.country,
        taxRate: command.taxRate,
      };

      return await this.listingRepository.create(listingPayload);
    }
  }

  @CachedEntity({
    builder: () => buildListingsKey(),
    options: { ttl: WEEK_IN_SECONDS },
  })
  private async fetchLisitngs() {
    return await this.listingRepository.findAll();
  }
}
