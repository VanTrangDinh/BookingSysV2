import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExternalApiAccessible } from '../auth/framework/external-api.decorator';
import { JwtAuthGuard } from '../auth/framework/auth.guard';
import { ListingResponseDto } from './dtos/listings-response.dto';
import { UserSession } from '../../../dist/main';
import { IJwtPayload } from '../../shared';
import { CreateListingRequestDto } from './dtos/create-listing-request.dto';
import { CreateListing } from './usecases/create-listings/create-listing.usecase';
import { ApiResponse } from '../shared/framework/response.decorator';
import { CreateListingCommand } from './usecases/create-listings/create-listing.command';

@Controller('/listings')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('Listings')
export class ListingsController {
  constructor(private createListingUsecase: CreateListing) {}

  @Post('')
  @ApiResponse(ListingResponseDto, 201)
  @ApiOperation({
    summary: 'Create a new Listings',
  })
  @ExternalApiAccessible()
  createListing(@UserSession() user: IJwtPayload, @Body() body: CreateListingRequestDto): Promise<ListingResponseDto> {
    return this.createListingUsecase.execute(
      CreateListingCommand.create({
        propertyName: body.propertyName,
        zipcode: body.zipcode,
        pathroomCnt: body.pathroomCnt,
        roomCnt: body.roomCnt,
        guestNum: body.guestNum,
        pricePerNight: body.pricePerNight,
        cleaningFee: body.cleaningFee,
        checkInTime: body.checkInTime,
        checkOutTime: body.checkOutTime,
        isRefundable: body.isRefundable,
        cancellationPeriod: body.cancellationPeriod,
        cancellationType: body.cancellationType,
        refundRate: body.refundRate,
        numOfRatings: body.numOfRatings,
        avgRatings: body.avgRatings,
        street: body.street,
        city: body.city,
        stateofResidence: body.stateofResidence,
        country: body.country,
        taxRate: body.taxRate,
      }),
    );
  }
}
