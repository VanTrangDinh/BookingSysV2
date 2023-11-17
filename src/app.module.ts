import { OrganizationModule } from './app/organization/organization.module';
import { Module, Logger, DynamicModule, ForwardReference, Provider } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SharedModule } from './app/shared/shared.module';
import { AuthModule } from './app/auth/auth.module';
import { EnvironmentsModule } from './app/environments/environments.module';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigModule } from './config/configEnv.module';
import { UserModule } from './app/user/user.module';
import { IdempotencyInterceptor } from './app/shared/framework/idempotency.interceptor';
import { TestingModule } from './app/testing/testing.module';
import { HealthModule } from './app/health/health.module';

// import { SharedModule } from './app/shared/shared.module';

const enterpriseImports = (): Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference> => {
  const modules: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference> = [];
  // try {
  //   if (process.env.NOVU_MANAGED_SERVICE === 'true' || process.env.CI_EE_TEST === 'true') {
  //     // modules.push(require('@novu/ee-auth')?.EEAuthModule);
  //   }
  // } catch (e) {
  //   Logger.error(e, `Unexpected error while importing enterprise modules`, 'EnterpriseImport');
  // }

  return modules;
};

const baseModules: Array<Type | DynamicModule | Promise<DynamicModule> | ForwardReference> = [
  SharedModule,
  AuthModule,
  OrganizationModule,
  EnvironmentsModule,
  UserModule,
  // EnvironmentConfigModule,
  TestingModule,
  HealthModule,
];

const enterpriseModules = enterpriseImports();

const modules = baseModules.concat(enterpriseModules);

/**
 * Nest is watching for these APP_* providers, and ends up attaching a uuid to the token so that you can have multiple
 * values for the single provider token
 */
const providers: Provider[] = [
  {
    provide: APP_INTERCEPTOR, //APP_INTERCEPTOR as its token (an identifier for the provider)
    useClass: IdempotencyInterceptor,
  },
];

if (process.env.NODE_ENV === 'test') {
  modules.push(TestingModule);
}

@Module({
  imports: modules,
  controllers: [],
  providers,
})
export class AppModule {
  constructor() {
    Logger.log(`BOOTSTRAPPED NEST APPLICATION!!!`);
  }
}
