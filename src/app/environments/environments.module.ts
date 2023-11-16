import { Module } from '@nestjs/common';
import { EnvironmentsController } from './environments.controller';
import { USE_CASES } from './usecases';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule,],
  controllers: [EnvironmentsController],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class EnvironmentsModule {}
