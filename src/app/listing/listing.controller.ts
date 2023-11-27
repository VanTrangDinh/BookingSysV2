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
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExternalApiAccessible } from '../auth/framework/external-api.decorator';
import { JwtAuthGuard } from '../auth/framework/auth.guard';
import { ListingResponseDto } from './dtos/listings-response.dto';
import { IJwtPayload } from '../../shared';
import { CreateListingRequestDto } from './dtos/create-listing-request.dto';
import { CreateListing } from './usecases/create-listings/create-listing.usecase';
import { ApiResponse } from '../shared/framework/response.decorator';
import { CreateListingCommand } from './usecases/create-listings/create-listing.command';
import { GetByHostListings } from './usecases/get-my-listings/get-my-listings.usecase';
import { GetListingsCommand } from './usecases/get-my-listings/get-my-listings.command';
import { GetListingByHost, GetListingCommand } from './usecases/get-my-listing';
import { ApiOkPaginatedResponse } from '../shared/framework/paginated-ok-response.decorator';
import { PaginatedResponseDto } from './dtos/pagination-response';
import { GetListingsDto } from './dtos/get-listings.dto';
import { UserSession } from '../shared/framework/user.decorator';
import { GetAllListingsCommand } from './usecases/get-all-listings/get-listings.command';
import { GetListings } from './usecases/get-all-listings/get-listings.usecase';
import { GetListingById } from './usecases/get-listing/get-listing-id.usecase';
import { GetListingByIdCommand } from './usecases/get-listing/get-listing-id.command';

@Controller('/listings')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
@ApiTags('Listings')
export class ListingsController {
  constructor(
    private createListingUsecase: CreateListing,
    private getlistingsUsecae: GetByHostListings,
    private getListingUses: GetListingByHost,
    private getAllListingsUsecase: GetListings,
    private getListingByIdUsecase: GetListingById,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(ListingResponseDto, 201)
  @ApiOperation({
    summary: 'Create Listing',
    description:
      'Creates a new listing on the Airbnb platform. ' +
      'The listing will represent a property or space available for booking. ' +
      'Details such as property type, amenities, and pricing can be specified during the creation process.',
  })
  @ExternalApiAccessible()
  async createListing(
    @UserSession() user: IJwtPayload,
    @Body() body: CreateListingRequestDto,
  ): Promise<ListingResponseDto> {
    return this.createListingUsecase.execute(
      CreateListingCommand.create({
        userId: user._id,
        roles: user.roles,
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
        refundRate: body.refundRate,
        numOfRatings: body.numOfRatings,
        avgRatings: body.avgRatings,
        street: body.street,
        city: body.city,
        country: body.country,
        taxRate: body.taxRate,
      }),
    );
  }

  @Get('/get-all-listings')
  @ExternalApiAccessible()
  @ApiOkPaginatedResponse(ListingResponseDto)
  @ApiOperation({
    summary: 'Get listings',
    description: 'Returns a list of listings, could paginated using the `page` and `limit` query parameter',
  })
  async getAllListings(@Query() query: GetListingsDto): Promise<PaginatedResponseDto<ListingResponseDto>> {
    return await this.getAllListingsUsecase.execute(
      GetAllListingsCommand.create({
        page: query.page ? Number(query.page) : 0,
        limit: query.limit ? Number(query.limit) : 10,
      }),
    );
  }

  @Get('/get-listings-by-host')
  @ExternalApiAccessible()
  @UseGuards(JwtAuthGuard)
  @ApiOkPaginatedResponse(ListingResponseDto)
  @ApiOperation({
    summary: 'Get listings by host',
    description: 'Returns a list of listings, could paginated using the `page` and `limit` query parameter',
  })
  async getListings(
    @UserSession() user: IJwtPayload,
    @Query() query: GetListingsDto,
  ): Promise<PaginatedResponseDto<ListingResponseDto>> {
    return await this.getlistingsUsecae.execute(
      GetListingsCommand.create({
        userId: user._id,
        page: query.page ? Number(query.page) : 0,
        limit: query.limit ? Number(query.limit) : 10,
      }),
    );
  }

  @Get('/host/:listingId')
  @ExternalApiAccessible()
  @UseGuards(JwtAuthGuard)
  @ApiResponse(ListingResponseDto)
  @ApiOperation({
    summary: 'Get listing',
    description: 'Get listing by your internal id used to identify the listing',
  })
  async getListing(
    @UserSession() user: IJwtPayload,
    @Param('listingId') listingId: string,
  ): Promise<ListingResponseDto> {
    return await this.getListingUses.execute(
      GetListingCommand.create({
        listingId,
        userId: user._id,
      }),
    );
  }

  @Get('/:listingId')
  @ExternalApiAccessible()
  @ApiResponse(ListingResponseDto)
  @ApiOperation({
    summary: 'Get listing by id',
    description: 'Get listing by your external user used to identify the listing',
  })
  async getListingById(@Param('listingId') listingId: string): Promise<ListingResponseDto> {
    return await this.getListingByIdUsecase.execute(
      GetListingByIdCommand.create({
        listingId,
      }),
    );
  }
}
