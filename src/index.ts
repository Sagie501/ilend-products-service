import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { rootResolvers as resolvers } from './root-resolvers';
import { rootTypeDefs as typeDefs } from './root-schema';
import { Environment } from './environment/environment';
import { Config } from './environment/config';
import { buildFederatedSchema } from '@apollo/federation';
import { ProductDataSource } from './data-source/product-data-source';

const app = express();

const config: Config = Environment.getConfig();

app.use(express.json({limit: Infinity}));

const productsDataSource = new ProductDataSource(config.dbConfig);

const server = new ApolloServer({
  schema: buildFederatedSchema([
    { typeDefs, resolvers }
  ]),
  dataSources: () => {
    return {
      productsDataSource
    };
  }
});
server.applyMiddleware({ app });

app.listen({port: config.port}, () => {
  console.log(`${config.serviceName} ready at port: ${config.port}`)
});
