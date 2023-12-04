import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { ExternalApiAccessible, UserSession } from '../../application-generic';
import { IJwtPayload } from '../../shared';
import { CreateBookingRequestDto } from './dtos';
import { ApiResponse } from '../shared/framework/response.decorator';
import { CreateBooking } from './usecases/create-booking/create-booking.usecase';
import { CreateBookingCommand } from './usecases/create-booking/create-booking.command';

@Controller('/booking')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
@ApiTags('Booking')
export class BookingController {
  constructor(private createBookingUsecase: CreateBooking) {}

  @Post('')
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
        checkInDate: body.checkInDate,
        checkOutDate: body.checkOutDate,
        adultsGuestNum: body.adultsGuestNum,
        infantsGuestNum: body.infantsGuestNum,
        petsNum: body.petsNum,
        cleaningFee: body.cleaningFee,
        amountPaid: body.amountPaid,
        isRefundable: body.isRefundable,
        isCancelled: body.isCancelled,
        promoCode: body.promoCode,
        tax: body.tax,
        cancelDate: body.cancelDate,
      }),
    );
  }
}
