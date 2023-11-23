import { OrganizationModule } from './app/organization/organization.module';
import {
  Module,
  Logger,
  DynamicModule,
  ForwardReference,
  Provider,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
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
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnexModule } from 'nest-knexjs';
import ormconfig from './dal/typeorm/ormconfig';

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
  // TypeOrmModule.forRoot(ormconfig),
  // KnexModule.forRoot({
  //   config: {
  //     client: 'postgresql',
  //     useNullAsDefault: true,
  //     connection: {
  //       host: '127.0.0.2',
  //       port: 5432,
  //       user: 'postgres',
  //       password: '811212',
  //       database: 'AirbnbBE',
  //     },
  //   },
  // }),
  // TypeOrmModule.forRoot({
  //   type: 'postgres',
  //   host: '172.25.0.2',
  //   port: 5432,
  //   username: 'postgres',
  //   password: '811212',
  //   database: 'AirbnbBE',
  //   autoLoadEntities: true,
  //   synchronize: true,
  // }),
  // DomainModule.register({ imports: [InfraModule] }),
];

const enterpriseModules = enterpriseImports();

const modules = baseModules.concat(enterpriseModules);

/**
 * Nest is watching for these APP_* providers, and ends up attaching a uuid to the token so that you can have multiple
 * values for the single provider token
 */

/**
 * Nếu bạn đã đăng ký interceptor bằng cách sử dụng APP_INTERCEPTOR trong file app.module.ts như trước đó, thì bạn
 * không cần sử dụng app.useGlobalInterceptors() nữa. Đối với trường hợp sử dụng APP_INTERCEPTOR, framework NestJS sẽ
 * tự động áp dụng interceptor đó global cho tất cả các route trong ứng dụng của bạn.
 * không cần sử dụng app.useGlobalInterceptors() trong file main.ts hay ở bất kỳ nơi nào khác
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
  providers: [],
})
export class AppModule {
  constructor() {
    Logger.log(`BOOTSTRAPPED NEST APPLICATION!!!`);
  }
}
