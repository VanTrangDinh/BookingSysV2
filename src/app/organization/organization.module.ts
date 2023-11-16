import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { USE_CASES } from './usecases';
import { SharedModule } from '../shared/shared.module';
import { EnvironmentsModule } from '../environments/environments.module';

@Module({
  imports: [SharedModule, EnvironmentsModule],
  controllers: [OrganizationController],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class OrganizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // throw new Error('Method not implemented.');
  }
}
