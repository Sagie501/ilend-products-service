import { DataSource } from 'apollo-datasource';
import Knex from 'knex';
import { InMemoryLRUCache } from 'apollo-server-caching';
import crypto from 'crypto';

// Implementation took from datasource-sql library version 1.2.0
// Took because the export didn't work well
export class SQLDataSource extends DataSource {
  context;
  cache;
  db: Knex;
  knex: Knex;

  constructor(knexConfig: Knex.Config) {
    super();

    if (typeof knexConfig === "function") {
      this.db = knexConfig;
    } else {
      this.db = Knex(knexConfig);
    }

    this.knex = this.db;
  }

  initialize(config) {
    this.context = config.context;
    this.cache = config.cache || new InMemoryLRUCache();
  }

  cacheQuery(ttl = 5, query) {
    const cacheKey = crypto
        .createHash("sha1")
        .update(query.toString())
        .digest("base64");

    return this.cache.get(cacheKey).then(entry => {
      if (entry) return Promise.resolve(JSON.parse(entry));

      return query.then(rows => {
        if (rows) this.cache.set(cacheKey, JSON.stringify(rows), { ttl });

        return Promise.resolve(rows);
      });
    });
  }
}
