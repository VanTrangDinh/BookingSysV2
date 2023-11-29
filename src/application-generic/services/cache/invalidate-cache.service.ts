import { Inject, Injectable, Logger } from '@nestjs/common';
import { CacheService } from './cache.service';
const LOG_CONTEXT = 'InvalidateCache';

/**
 * Cache Invalidation
 * Thay vì cố gắng đồng bộ cả hai bên mỗi khi có thay đổi, bạn có thể xem xét chiến lược hủy cache.
 * Khi có thay đổi, hủy cache cho các mục liên quan để đảm bảo rằng đọc sau cần phải truy vấn nguồn chính và cập
 * nhậtlại cache.
 */

@Injectable()
export class InvalidateCacheService {
  constructor(@Inject(CacheService) private cacheService: CacheService) {}

  public async invalidateByKey({ key }: { key: string }): Promise<number | any> {
    if (!this.cacheService?.cacheEnabled()) return;

    try {
      return await this.cacheService.del(key);
    } catch (err) {
      Logger.error(err, `An error has occurred when deleting "key: ${key}",`, LOG_CONTEXT);
    }
  }
}
