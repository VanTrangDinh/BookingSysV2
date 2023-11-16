import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './user.controller';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class UserModule {}
