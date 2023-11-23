import { EntityManager } from 'typeorm';

export class BaseRepository<T_DBModel, T_MappedEntity, T_Enforcement> {
  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async count(query): Promise<number> {
    return this.entityManager.count(query);
  }
}
