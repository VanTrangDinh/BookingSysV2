// import * as dotenv from 'dotenv';

// // if (process.env.NODE_ENV === 'dev') {
// //   dotenv.config({ path: './env/.env.dev' });
// // }

// import 'reflect-metadata';
// import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
// // import { ORMLogger } from './utils/ORMLogger';

// export const dataSourceOptions: Map<string, DataSourceOptions> = new Map([
//   [
//     'default',
//     {
//       type: 'postgres',
//       host: process.env.DATABASE_HOST,
//       port: parseInt(process.env.DATABASE_PORT),
//       username: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_NAME,
//       entities: [__dirname + './../../**/*.entity{.ts,.js}'],

//       synchronize: false,
//       schema: process.env.DATABASE_SCHEMA,
//       migrationsRun: false,
//       migrationsTableName: 'migration_todo',
//       migrations: ['database/migrations/**/*{.ts,.js}'],
//       // type: 'postgres',
//       // host: process.env.DATABASE_HOST || 'localhost',
//       // port: parseInt(process.env.DATABASE_PORT) || 5432,
//       // username: process.env.DATABASE_USER || 'postgres',
//       // password: process.env.DATABASE_PASSWORD || 811212,
//       // database: process.env.DATABASE_NAME || 'AirbnbBE',
//       // entities: [__dirname + './../../**/*.entity{.ts,.js}'],
//       // synchronize: false,
//       // schema: process.env.DATABASE_SCHEMA,
//       // migrationsRun: false,
//       // migrationsTableName: 'migration_todo',
//       // migrations: ['database/migrations/**/*{.ts,.js}'],
//     },
//   ],
// ]);

// console.log([
//   'default',
//   {
//     type: 'postgres',
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT),
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     entities: [__dirname + './../../**/*.entity{.ts,.js}'],

//     synchronize: false,
//     schema: process.env.DATABASE_SCHEMA,
//     migrationsRun: false,
//     migrationsTableName: 'migration_todo',
//     migrations: ['database/migrations/**/*{.ts,.js}'],
//   },
// ]);
// // to be used instead of getConnectionManager()
// export class DataSourceManager {
//   private static instance: DataSourceManager;
//   private dataSources: Map<string, DataSource> = new Map();

//   private constructor() {}

//   public static getInstance(): DataSourceManager {
//     if (!DataSourceManager.instance) {
//       DataSourceManager.instance = new DataSourceManager();
//     }
//     return DataSourceManager.instance;
//   }

//   public async createDataSource(name: string, options?: DataSourceOptions): Promise<DataSource> {
//     const _options = options || dataSourceOptions.get(name);
//     return this.dataSources.set(name, await new DataSource(_options).initialize()).get(name);
//   }

//   public getDataSource(dataSourceName: string): DataSource {
//     return this.dataSources.get(dataSourceName || 'default');
//   }

//   private map() {
//     return Array.from(this.dataSources.values());
//   }

//   public getActiveDataSources() {
//     return this.map().filter((ds: DataSource) => ds.isInitialized);
//   }

//   public debug() {
//     console.log(
//       'DataSourceManager.debug',
//       this.getActiveDataSources().map((ds: DataSource) => {
//         return { isInitialized: ds.isInitialized, type: ds.options.type, dbName: ds.options.database };
//       }),
//     );
//   }

//   public async destroyDataSources() {
//     return Promise.all(Array.from(this.dataSources.values()).map((dataStore) => dataStore.destroy()))
//       .then((data) => {
//         console.log(`Destroyed (${data.length}) data source`);
//       })
//       .catch((errors) => {
//         console.log('Error: Destroying DataSources:', errors);
//       });
//   }
// }
