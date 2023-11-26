import { Module } from '@nestjs/common';
import { ListingsController } from './listing.controller';
import { USE_CASES } from './usecases';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/framework/roles.guard';
import { JwtAuthGuard } from '../auth/framework/auth.guard';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [ListingsController],
  providers: [...USE_CASES, RolesGuard, JwtAuthGuard],
  exports: [...USE_CASES, RolesGuard, JwtAuthGuard],
})
export class ListingModule {}
