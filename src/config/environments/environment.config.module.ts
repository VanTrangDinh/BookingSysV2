// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// // import { validate } from './environment-config.validation';
// import { EnvironmentConfigService } from './environment.config.servive';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: './env/.env.dev',
//       ignoreEnvFile: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' ? false : true,
//       isGlobal: true,
//       validate,
//     }),
//   ],
//   providers: [EnvironmentConfigService],
//   exports: [EnvironmentConfigService],
// })
// export class EnvironmentConfigModule {}
