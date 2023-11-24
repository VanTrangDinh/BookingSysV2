import { UserTokenExternalEntity } from './user-token-external.entity';
import { UserTokenEntity } from './user-token.entity';
import { UserEntity } from './user.entity';

export * from './user.entity';
export * from './user-token.entity';
export * from './user-token-external.entity';

export const databaseEntities = [UserEntity, UserTokenExternalEntity, UserTokenEntity];
