import { CacheService } from '../services';
import { CacheInMemoryProviderService } from '../services/in-memory-provider';

export const cacheInMemoryProviderService = {
  provide: CacheInMemoryProviderService,
  useFactory: (): CacheInMemoryProviderService => {
    return new CacheInMemoryProviderService();
  },
};

export const cacheService = {
  provide: CacheService,
  useFactory: async (): Promise<CacheService> => {
    const factoryCacheInMemoryProviderService = cacheInMemoryProviderService.useFactory();

    const service = new CacheService(factoryCacheInMemoryProviderService);
    await service.initialize();

    return service;
  },
};
