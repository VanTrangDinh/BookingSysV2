import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvVars } from './database-config-utils';

function buildConnectionOptions(data): TypeOrmModuleOptions {
  const connectionParams = {
    database: data.PG_DB,
    port: +data.PG_PORT || 5432,
    username: data.PG_USER,
    password: data.PG_PASS,
    host: data.PG_HOST,
    connectTimeoutMS: 5000,
    extra: {
      max: 25,
    },
  };

  const entitiesDir =
    data?.NODE_ENV === 'test' ? [__dirname + '/**/*.entity.ts'] : [__dirname + '/**/*.entity{.js,.ts}'];

  return {
    type: 'postgres',
    ...connectionParams,
    entities: entitiesDir,
    synchronize: false,
    uuidExtension: 'pgcrypto',
    migrationsRun: false,
    migrationsTransactionMode: 'all',
    logging: data.ORM_LOGGING || false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    keepConnectionAlive: true,
  };
}

function fetchConnectionOptions(type: string): TypeOrmModuleOptions {
  const data = getEnvVars();
  return buildConnectionOptions(data);
}

const ormconfig: TypeOrmModuleOptions = fetchConnectionOptions('postgres');

export { ormconfig };
export default ormconfig;
