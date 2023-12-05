import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { SharedModule } from '../shared/shared.module';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule],
  controllers: [BookingController],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class BookingModule {}
