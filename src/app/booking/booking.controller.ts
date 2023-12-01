import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/booking')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
@ApiTags('Booking')
export class BookingController {
  constructor() {}
}
