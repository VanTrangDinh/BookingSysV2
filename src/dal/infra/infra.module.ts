import { Global, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, getTypeOrmModuleOptions } from './database.config';
import { databaseEntities } from './entities';
import { UserRepository } from './repositories';

const imports = [
  TypeOrmModule.forRootAsync({
    useFactory: getTypeOrmModuleOptions,
  }),
  TypeOrmModule.forFeature(databaseEntities),
];

const providers: Provider[] = [UserRepository];

const moduleExports = [...providers];

@Global()
@Module({
  imports,
  providers: providers,
  exports: moduleExports,
})
export class InfraModule {}
