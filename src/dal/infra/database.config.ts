import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const url = process.env.DB_URL;
const urlOrParts = url
  ? { url }
  : {
      host: process.env.DB_HOSTNAME || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '811212',
      database: process.env.DB_DATABASE_NAME || 'AirbnbBE',
    };

export const databaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  entities: [__dirname + '/entities/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  subscribers: [__dirname + '/subscribers/*.{js,ts}'],
  migrationsRun: true,
  connectTimeoutMS: 10000, // 10 seconds
  ...urlOrParts,
};

// this export is used by TypeORM commands in package.json#scripts
export const dataSource = new DataSource(databaseConfig);
