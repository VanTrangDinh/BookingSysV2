import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvVars } from '../database-config-utils';

// function dbSslConfig(envVars) {
//   let config = {};

//   if (envVars?.DATABASE_URL)
//     config = {
//       url: envVars.DATABASE_URL,
//       ssl: { rejectUnauthorized: false },
//     };

//   if (envVars?.CA_CERT)
//     config = {
//       ...config,
//       ...{ ssl: { rejectUnauthorized: false, ca: envVars.CA_CERT } },
//     };

//   return config;
// }

function buildConnectionOptions(data): TypeOrmModuleOptions {
  // const connectionParams = {
  //   database: data.PG_DB,
  //   port: +data.PG_PORT || 5432,
  //   username: data.PG_USER,
  //   password: data.PG_PASS,
  //   host: data.PG_HOST,
  //   connectTimeoutMS: 5000,
  //   extra: {
  //     max: 25,
  //   },
  //   ...dbSslConfig(data),
  // };

  return {
    type: 'postgres',
    host: '172.24.0.2',
    port: 5432,
    username: 'postgres',
    password: '811212',
    database: 'AirbnbBE',
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],

    synchronize: false,
    // schema: 'public',
    migrationsRun: false,
    migrationsTableName: 'migration_todo',
    migrations: ['src/migrations/**/*{.ts,.js}'],
  };
}

function fetchConnectionOptions(type: string): TypeOrmModuleOptions {
  const data = getEnvVars();

  return buildConnectionOptions(data);
}

const ormconfig: TypeOrmModuleOptions = fetchConnectionOptions('postgres');

export { ormconfig };
export default ormconfig;
