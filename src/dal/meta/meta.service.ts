// import { Injectable, Optional } from '@nestjs/common';
// import type { Knex } from 'knex';
// import type * as knex from 'knex';
// import { XKnex } from '../db/CustomKnex';

// @Injectable()
// export class MetaService {
//   private _knex: knex.Knex;
//   private _config: any;

//   constructor(config, @Optional() trx = null) {
//     this._config = config;
//     this._knex = XKnex({
//       ...this._config.meta.db,
//       useNullAsDefault: true,
//     });

//     this.trx = trx;
//   }

//   private trx: Knex.Transaction;
// }
