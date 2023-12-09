import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { ExternalApiAccessible, UserSession } from '../../application-generic';
import { IJwtPayload, UserRoleEnum } from '../../shared';
import { CreateBookingRequestDto } from './dtos';
import { ApiResponse } from '../shared/framework/response.decorator';
import { CreateBooking } from './usecases/create-booking/create-booking.usecase';
import { CreateBookingCommand } from './usecases/create-booking/create-booking.command';
import { Roles } from '../auth/framework/roles.decorator';
import { RolesGuard } from '../auth/framework/roles.guard';
import { GetBookingDetails } from './usecases/get-booking-details/get-booking-details.usecase';
import { GetBookingDetailsCommand } from './usecases/get-booking-details/get-booking-details.command';

@Controller('/booking')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
@ApiTags('Booking')
export class BookingController {
  constructor(
    private createBookingUsecase: CreateBooking,
    private getBookingDetailsUsecase: GetBookingDetails,
  ) {}

  @Post('')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  @ApiResponse(BookingResponseDto, 201)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create Booking',
    description: 'Creates a new booking on the Airbnb platform.',
  })
  @ExternalApiAccessible()
  async createBooking(
    @UserSession() user: IJwtPayload,
    @Body() body: CreateBookingRequestDto,
  ): Promise<BookingResponseDto> {
    return this.createBookingUsecase.execute(
      CreateBookingCommand.create({
        _listingId: body._listingId,
        userId: user._id,
        checkInDate: new Date(body.checkInDate),
        checkOutDate: new Date(body.checkOutDate),
        adultsGuestNum: body.adultsGuestNum,
        infantsGuestNum: body.infantsGuestNum,
        petsNum: body.petsNum,
        promoCode: body.promoCode,
      }),
    );
  }

  @Get('/bookingId')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  @ApiResponse(BookingResponseDto, 201)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get booking details',
  })
  @ExternalApiAccessible()
  async getBookingDetails(
    @UserSession() user: IJwtPayload,
    @Param('bookingId') bookingId: string,
  ): Promise<BookingResponseDto | null> {
    return this.getBookingDetailsUsecase.execute(GetBookingDetailsCommand.create({ bookingId, userId: user._id }));
  }
}

/* 

  _id: string;
  checkInDate: Date;
  checkOutDate: Date;
  amountPaid: number;
  bookingDate: Date;
  modifiedDate: Date;
  adultsGuestNum: number;
  childrenGuestNum: number;
  infantsGuestNum: number;
  petsNum: number;
  isCancelled: boolean;
  refundPaid: number;
  cancelDate: Date;
  promoCode: string;
  _userId: string;
  _listingId: string;
  totalPrice: number;
  tax: number;
  totalPriceTax: number;
  amountDue: number;
  refundAmount: number;
*/
