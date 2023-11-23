import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';

const imports = [
  // ConfigModule.forRoot(immichAppConfig),
  TypeOrmModule.forRoot(databaseConfig),
  // TypeOrmModule.forFeature(databaseEntities),
  // ScheduleModule,
];

@Module({
  imports,
  providers: [],
  exports: [],
})
export class InfraModule {}
