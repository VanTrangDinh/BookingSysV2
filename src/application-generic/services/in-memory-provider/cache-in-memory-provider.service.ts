import { Logger } from '@nestjs/common';

import { InMemoryProviderService } from './in-memory-provider.service';
import { InMemoryProviderEnum, InMemoryProviderClient, ScanStream } from './types';

// import { GetIsInMemoryClusterModeEnabled } from '../../usecases';

const LOG_CONTEXT = 'CacheInMemoryProviderService';

export class CacheInMemoryProviderService {
  public inMemoryProviderService: InMemoryProviderService;
  public isCluster: boolean;

  constructor() {
    const provider = this.selectProvider();
    const enableAutoPipelining = process.env.REDIS_CACHE_ENABLE_AUTOPIPELINING === 'true';
    this.inMemoryProviderService = new InMemoryProviderService(provider, this.isCluster, enableAutoPipelining);
  }

  private selectProvider(): InMemoryProviderEnum {
    if (process.env.IS_DOCKER_HOSTED) {
      return InMemoryProviderEnum.REDIS;
    }

    return InMemoryProviderEnum.ELASTICACHE;
  }

  public async initialize(): Promise<void> {
    await this.inMemoryProviderService.delayUntilReadiness();
  }

  public getClient(): InMemoryProviderClient | any {
    return this.inMemoryProviderService.inMemoryProviderClient;
  }

  public getClientStatus(): string {
    return this.getClient().status;
  }

  public getTtl(): number {
    return this.inMemoryProviderService.inMemoryProviderConfig.ttl;
  }

  public isReady(): boolean {
    return this.inMemoryProviderService.isClientReady();
  }
}
