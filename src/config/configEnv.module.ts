import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { pathToDotEnv } from '.';
import { validateEnv } from './env-validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: pathToDotEnv,
      isGlobal: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class EnvironmentConfigModule {}
