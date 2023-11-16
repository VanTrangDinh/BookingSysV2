import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import Redis from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';
import { getRedisPrefix } from '../../../shared/config';
import { ConnectionOptions } from 'tls';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    const keyPrefix = getRedisPrefix() ? `socket.io#${getRedisPrefix()}` : 'socket.io';
    const pubClient = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      keyPrefix,
      tls: process.env.REDIS_TLS as ConnectionOptions,
    });
    const subClient = pubClient.duplicate();

    server.adapter(createAdapter(pubClient, subClient));

    return server;
  }
}
