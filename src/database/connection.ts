import knex from 'knex';
import type { Knex } from 'knex';
import pg from 'pg';

class LegacyPgClient extends pg.Client {
  constructor(config: pg.ClientConfig) {
    super(config);
  }
}

const clientMap = {
  pg: LegacyPgClient,
} as const;

type ClientKey = keyof typeof clientMap;

const tryPgPackage = (packageName: ClientKey): ClientKey | false => {
  try {
    require.resolve(packageName);
    return packageName;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    throw error;
  }
};

const getPgPackageName = (): ClientKey => {
  // NOTE: allow forcing the package to use (mostly used for testing purposes)
  if (typeof process.env.PG_PKG !== 'undefined') {
    return process.env.PG_PKG as ClientKey;
  }

  // NOTE: this tries to find the best PostgreSQL module possible to use
  // while keeping retro compatibility
  const matchingPackage: ClientKey | false = tryPgPackage('pg');

  if (!matchingPackage) {
    throw new Error('No PostgreSQL package found');
  }

  return matchingPackage;
};

export const createConnection = (config: Knex.Config) => {
  const knexConfig = { ...config };
  if (knexConfig.client === 'pg') {
    const pgPackageName = getPgPackageName();

    knexConfig.client = clientMap[pgPackageName] as Knex.Config['client'];
  }

  return knex(knexConfig);
};
