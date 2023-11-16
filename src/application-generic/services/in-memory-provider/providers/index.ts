import {
  IRedisProviderConfig,
  getRedisInstance,
  getRedisProviderConfig,
  isClientReady as isRedisClientReady,
  validateRedisProviderConfig,
} from './redis-provider';
import { InMemoryProviderEnum, Redis } from '../types';

export type InMemoryProviderConfig = IRedisProviderConfig;

export const getClientAndConfig = (): {
  getClient: () => Redis | undefined;
  getConfig: () => IRedisProviderConfig;
  isClientReady: (string) => boolean;
  provider: InMemoryProviderEnum;
  validate: () => boolean;
} => {
  return {
    getClient: getRedisInstance,
    getConfig: getRedisProviderConfig,
    isClientReady: isRedisClientReady,
    provider: InMemoryProviderEnum.REDIS,
    validate: validateRedisProviderConfig,
  };
};
