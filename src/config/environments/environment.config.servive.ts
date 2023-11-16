// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// // import { DatabaseConfig } from 'src/domain/config/database.interface';
// // import { JWTConfig } from 'src/domain/config/jwt.interface';

// @Injectable()
// export class EnvironmentConfigService {
//   constructor(private configService: ConfigService) {}
//   getDatabaseHost(): string {
//     return this.configService.get<string>('DATABASE_HOST');
//   }
//   getDatabasePort(): number {
//     return this.configService.get<number>('DATABASE_PORT');
//   }
//   getDatabaseUser(): string {
//     return this.configService.get<string>('DATABASE_USER');
//   }
//   getDatabasePassword(): string {
//     return this.configService.get<string>('DATABASE_PASSWORD');
//   }
//   getDatabaseName(): string {
//     return this.configService.get<string>('DATABASE_NAME');
//   }
//   getDatabaseSchema(): string {
//     return this.configService.get<string>('DATABASE_SCHEMA');
//   }
//   getDatabaseSync(): boolean {
//     return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
//   }
//   getJwtSecret(): string {
//     return this.configService.get<string>('JWT_SECRET');
//   }

//   getJwtExpirationTime(): string {
//     return this.configService.get<string>('JWT_EXPIRATION_TIME');
//   }

//   getJwtRefreshSecret(): string {
//     return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
//   }

//   getJwtRefreshExpirationTime(): number {
//     const refreshTokenExpiresInSec = this.configService.get<string>('JWT_REFRESH_TOKEN_EXP_IN_SEC');
//     return parseInt(refreshTokenExpiresInSec, 10);
//   }

//   getAccessTokenExpirationTime(): number {
//     const accessTokenExpiresInSec = this.configService.get<string>('JWT_ACCESS_TOKEN_EXP_IN_SEC');
//     return parseInt(accessTokenExpiresInSec, 10);
//   }

//   getRefreshTokenExpirationTime(): string {
//     return this.configService.get<string>('JWT_REFRESH_TOKEN_EXP_IN_SEC');
//   }

//   getJwtPrivateKeyBase64(): string {
//     const privateKey = this.configService.get<string>('JWT_PRIVATE_KEY_BASE64');
//     return Buffer.from(privateKey, 'base64').toString('utf8');
//   }

//   getJwtPublicKeyBase64(): string {
//     const publicKey = this.configService.get<string>('JWT_PUBLIC_KEY_BASE64');
//     return Buffer.from(publicKey, 'base64').toString('utf8');
//   }
// }
