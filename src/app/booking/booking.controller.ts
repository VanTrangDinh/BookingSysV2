import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
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

@Controller('/booking')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
@ApiTags('Booking')
export class BookingController {
  constructor(private createBookingUsecase: CreateBooking) {}

  @Post('')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  @ApiResponse(BookingResponseDto, 201)
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
        bookingDate: new Date(),
        adultsGuestNum: body.adultsGuestNum,
        infantsGuestNum: body.infantsGuestNum,
        petsNum: body.petsNum,
        cleaningFee: body.cleaningFee,
        amountPaid: body.amountPaid,
        refundPaid: body.refundPaid,
        isCancelled: body.isCancelled,
        promoCode: body.promoCode,
        tax: body.tax,
        cancelDate: body.cancelDate,
      }),
    );
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
