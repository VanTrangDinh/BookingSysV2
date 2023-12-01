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
  Patch,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExternalApiAccessible } from '../auth/framework/external-api.decorator';
import { JwtAuthGuard } from '../auth/framework/auth.guard';
import { ListingResponseDto } from './dtos/listings-response.dto';
import { IJwtPayload, UserRoleEnum } from '../../shared';
import { CreateListingRequestDto } from './dtos/create-listing-request.dto';
import { CreateListing } from './usecases/create-listings/create-listing.usecase';
import { ApiResponse } from '../shared/framework/response.decorator';
import { CreateListingCommand } from './usecases/create-listings/create-listing.command';
import { GetListingsByHost } from './usecases/get-my-listings/get-my-listings.usecase';
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
import { SearchListing } from './usecases/search-listing/search-listing.usecase';
import { SearchCommand } from './usecases/search-listing/search-listing.commad';
import { SearchDto } from './dtos/search.dto';
import { UpdateListingAvailable } from './usecases/update-listings-available/update-listing-available.usecase';
import { UpdateListingAvailableCommand } from './usecases/update-listings-available';
import { RemoveListingResponseDto, UpdateListingAvailableRequestDto } from './dtos';
import { UpdateLsitngResponseDto } from './dtos/update-lisiting-response.dto';
import { UpdateListingRequestDto } from './dtos/update-listing-request.dto';
import { UpdateListing, UpdateListingCommand } from './usecases/update-listing';
import { RemoveListing, RemoveListingCommand } from './usecases/remove-listing';
import { RolesGuard } from '../auth/framework/roles.guard';
import { Roles } from '../auth/framework/roles.decorator';

@Controller('/listings')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
@ApiTags('Listings')
export class ListingsController {
  constructor(
    private createListingUsecase: CreateListing,
    private getlistingsUsecae: GetListingsByHost,
    private getListingUses: GetListingByHost,
    private getAllListingsUsecase: GetListings,
    private getListingByIdUsecase: GetListingById,
    private searchListingsUsecase: SearchListing,
    private updateListingAvailableUsecase: UpdateListingAvailable,
    private updateListing: UpdateListing,
    private removeListing: RemoveListing,
  ) {}

  @Get('/host/:listingId')
  @ExternalApiAccessible()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.HOST)
  @ApiBearerAuth()
  @ApiResponse(ListingResponseDto)
  @ApiOperation({
    summary: 'Get listing',
    description: 'Get listing by your internal id used to identify the listing',
  })
  async getListing(
    // @Req() req: IJwtPayload,
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

  @Delete('/:listingId')
  @ExternalApiAccessible()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.HOST)
  @ApiResponse(RemoveListingResponseDto)
  @ApiOperation({
    summary: 'Delete listing',
    description: 'Deletes a listing entity from the Airbnb platform',
  })
  async removeSubscriber(
    @UserSession() user: IJwtPayload,
    @Param('listingId') listingId: string,
  ): Promise<RemoveListingResponseDto> {
    return await this.removeListing.execute(
      RemoveListingCommand.create({
        listingId,
        userId: user._id,
      }),
    );
  }

  @Patch('/:listingId/updateListing')
  @ExternalApiAccessible()
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.HOST)
  @ApiResponse(UpdateLsitngResponseDto)
  @ApiOperation({
    summary: 'Update subscriber global preferences',
  })
  async updateSubscriberGlobalPreferences(
    @UserSession() user: IJwtPayload,
    @Param('listingId') listingId: string,
    @Body() body: UpdateListingRequestDto,
  ) {
    const commandData: any = { listingId, userId: user._id };

    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        commandData[key] = body[key];
      }
    });

    const command = UpdateListingCommand.create(commandData);
    return await this.updateListing.execute(command);
  }

  @Patch('/:listingId/isAvailable')
  @ExternalApiAccessible()
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.HOST)
  @ApiResponse(ListingResponseDto)
  @ApiOperation({
    summary: 'Update listing available status',
    description: 'Used to update the listing isAvailable flag.',
  })
  async updateListingAvailability(
    @UserSession() user: IJwtPayload,
    @Param('listingId') listingId: string,
    @Body() body: UpdateListingAvailableRequestDto,
  ): Promise<ListingResponseDto> {
    return await this.updateListingAvailableUsecase.execute(
      UpdateListingAvailableCommand.create({
        userId: user._id,
        isAvailable: body.isAvailable,
        listingId,
      }),
    );
  }

  @Post('')
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.HOST)
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

  @Get('/search')
  @ExternalApiAccessible()
  @ApiResponse(ListingResponseDto, 201)
  @ApiOperation({
    summary: 'Search listing by many keys',
  })
  async searchListing(@Body() search: SearchDto) {
    return this.searchListingsUsecase.execute(
      SearchCommand.create({
        city: search?.city,
        street: search?.street,
        country: search?.country,
        checkInTime: search?.checkInTime,
        checkOutTime: search?.checkOutTime,
        guestNum: search?.guestNum,
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
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Number of page for the pagination',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: 'Size of page for the pagination',
    required: false,
  })
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
