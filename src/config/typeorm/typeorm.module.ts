// import { Module, Provider } from '@nestjs/common';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// // import { EnvironmentConfigService } from '../environment-config/environment-config.service';
// // import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

// export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
//   ({
//     type: 'postgres',
//     host: process.env.DATABASE_HOST || 'localhost',
//     port: parseInt(process.env.DATABASE_PORT) || 5432,
//     username: process.env.DATABASE_USER || 'postgres',
//     password: process.env.DATABASE_PASSWORD || 811212,
//     database: process.env.DATABASE_NAME || 'AirbnbBE',
//     entities: [__dirname + './../../**/*.entity{.ts,.js}'],
//     synchronize: false,
//     schema: process.env.DATABASE_SCHEMA,
//     migrationsRun: false,
//     migrationsTableName: 'migration_todo',
//     migrations: ['database/migrations/**/*{.ts,.js}'],
//     cli: {
//       migrationsDir: 'src/migrations',
//     },
//   }) as TypeOrmModuleOptions;
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [],
//       inject: [],
//       useFactory: getTypeOrmModuleOptions,
//     }),
//   ],
// })
// export class TypeOrmConfigModule {}
