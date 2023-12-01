import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [],
  exports: [],
})
export class BookingModule {}
