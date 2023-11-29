import { Inject, Logger } from '@nestjs/common';

import { CacheService, CachingConfig } from '../cache.service';
// import { CacheService } from '../CacheService';

const LOG_CONTEXT = 'CachedEntityInterceptor';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CachedEntity({ builder, options }: { builder: (...args) => string; options?: CachingConfig }) {
  const injectCache = Inject(CacheService);

  return (target: any, key: string, descriptor: any) => {
    const originalMethod = descriptor.value;
    const methodName = key;
    injectCache(target, 'cacheService');

    descriptor.value = async function (...args: any[]) {
      if (!this.cacheService?.cacheEnabled()) {
        return await originalMethod.apply(this, args);
      }

      const cacheService = this.cacheService as CacheService;

      const cacheKey = builder(...args);

      if (!cacheKey) {
        return await originalMethod.apply(this, args);
      }

      /**
       * Cache-Aside (Lazy Loading):
       * Dữ liệu được đọc từ cache trước khi kiểm tra xem nó có tồn tại hay không.
       * Nếu không tìm thấy trong cache, dữ liệu sẽ được đọc từ nguồn chính (original method) và sau
       * đó được đặt vào cache.
       */

      try {
        const value = await cacheService.get(cacheKey);

        if (value) {
          return JSON.parse(value);
        }
      } catch (err) {
        Logger.error(
          err,
          `An error has occurred when extracting "key: ${cacheKey}" in "method: ${methodName}"`,
          LOG_CONTEXT,
        );
      }

      const response = await originalMethod.apply(this, args);

      /**
       * Write-Behind (Write-Back):
       * Khi original method được gọi (ví dụ, this.userRepository.findById(_id)), kết quả được cập nhật vào cache
       * (await cacheService.set(cacheKey, JSON.stringify(response), options)).
       * Điều này đảm bảo rằng cache luôn chứa dữ liệu mới nhất và đồng bộ với nguồn chính.
       */
      try {
        await cacheService.set(cacheKey, JSON.stringify(response), options);
      } catch (err) {
        // eslint-disable-next-line no-console
        Logger.error(
          err,
          `An error has occurred when inserting key: ${cacheKey} in "method: ${methodName}`,
          LOG_CONTEXT,
        );
      }

      return response;
    };
  };
}
