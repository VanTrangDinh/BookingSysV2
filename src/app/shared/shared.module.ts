import { Module } from '@nestjs/common';
import { UserRepository, DalService, OrganizationRepository, EnvironmentRepository, LogRepository } from '../../dal';

import * as packageJson from '../../../package.json';
import { createNestLoggingModuleOptions, LoggerModule } from '../../application-generic/logging';
import {
  cacheService,
  CacheServiceHealthIndicator,
  InvalidateCacheService,
  DalServiceHealthIndicator,
} from '../../application-generic';
// import { InfraModule } from '../../dal/infra/infra.module';

const DAL_MODELS = [UserRepository, OrganizationRepository, EnvironmentRepository, LogRepository];

const dalService = {
  provide: DalService,
  useFactory: async () => {
    const service = new DalService();
    await service.connect(process.env.MONGO_URL);

    return service;
  },
};

const PROVIDERS = [
  dalService,
  cacheService,
  InvalidateCacheService,
  CacheServiceHealthIndicator,
  DalServiceHealthIndicator,
  ...DAL_MODELS,
];

@Module({
  imports: [
    // InfraModule,
    LoggerModule.forRoot(
      createNestLoggingModuleOptions({
        serviceName: packageJson.name,
        version: packageJson.version,
      }),
    ),
  ],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class SharedModule {}
