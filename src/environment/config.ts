import Knex from 'knex';

const baseConfig: Config = {
  port: parseInt(process.env.PORT, 10) || 5001,
  serviceName: process.env.SERVICE_NAME || 'Products Service',
  dbConfig: {
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      user : process.env.DB_USER || 'root',
      password : process.env.DB_PASSWORD || '1qaz!QAZ',
      database : process.env.DB_SCHEMA || 'ilend'
    }
  },
  imgurConfig: {
    url: 'https://api.imgur.com/3/image',
    clientId: '275f0ff3a3d4ad3',
    clientSecret: 'f1250730425f496a21d64c9590c3156ffa0fe675'
  }
};

export const config: EnvironmentConfig = {
  dev: {
    ...baseConfig
  },
  prod: {
    ...baseConfig,
    dbConfig: {
      client: process.env.DB_CLIENT || 'mysql',
      connection: {
        host : process.env.DB_HOST || '127.0.0.1',
        user : process.env.DB_USER || 'root',
        password : process.env.DB_PASSWORD || 'bartar@CS806',
        database : process.env.DB_SCHEMA || 'ilend'
      }
    }
  }
};

export interface EnvironmentConfig {
  dev: Config;
  prod: Config;
}

export interface Config {
  port: number;
  serviceName: string;
  dbConfig: Knex.Config;
  imgurConfig: {
    url: string;
    clientId: string;
    clientSecret: string;
  };
}
