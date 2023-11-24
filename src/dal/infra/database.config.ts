import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const url = process.env.DB_URL;
const urlOrParts = url
  ? { url }
  : {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || '811212',
      database: process.env.DATABASE_NAME || 'postgres',
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

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '811212',
    database: process.env.DATABASE_NAME || 'postgres',
    entities: [__dirname + '/src/../../*.entity{.ts,.js}'],
    // entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: true,
    // schema: config.getDatabaseSchema(),
    migrationsRun: true,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    autoLoadEntities: true,
  }) as TypeOrmModuleOptions;
