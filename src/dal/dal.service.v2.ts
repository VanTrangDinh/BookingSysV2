// import 'reflect-metadata';
// import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

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
//     },
//   ],

//   ['companyContext', getCompanyDataSource('postgresql', true)],
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

// export function getCompanyDataSource(databaseName: string, migrationsRun = true): DataSourceOptions {
//   return {
//     type: 'mysql',
//     charset: 'utf8mb4_unicode_ci',
//     host: config.get('dbHost'),
//     port: Number(config.get('dbPort')),
//     username: config.get('dbUser').toString(),
//     password: config.get('dbPass').toString(),
//     logger: new ORMLogger(),
//     database: databaseName,
//     acquireTimeout: 50000,
//     connectTimeout: 50000,
//     logging: process.env.NODE_ENV !== 'production',
//     entities: [__dirname + '/models/*.{js,ts}', __dirname + '/modules/**/models/*.{js,ts}'],
//     migrations: [__dirname + '/migrations/companyContext/*.{js,ts}'],
//     subscribers: [__dirname + '/subscribers/**/*.{js,ts}'],
//     migrationsRun,
//     bigNumberStrings: true,
//   };
// }

// // HELPER FUNCTIONS FOR BETTER TYPEORM v0.2.x -> v0.3.x UPDATE
// // to be used instead of getRepository()
// export function getDataRepository<Entity extends ObjectLiteral>(
//   entityClass: EntityTarget<Entity>,
//   dataSourceName?: string,
// ): Repository<Entity> {
//   return DataSourceManager.getInstance()
//     .getDataSource(dataSourceName || 'default')
//     .getRepository(entityClass);
// }

// // to be used instead of getConnection()
// export function getDataSource(dataSourceName?: string): DataSource {
//   return DataSourceManager.getInstance().getDataSource(dataSourceName || 'default');
// }
