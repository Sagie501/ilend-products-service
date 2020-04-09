import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { rootResolvers as resolvers } from './root-resolvers';
import { rootTypeDefs as typeDefs } from './root-schema';
import { Environment } from './environment/environment';
import { Config } from './environment/config';
import { buildFederatedSchema } from '@apollo/federation';

const app = express();

const server = new ApolloServer({
  schema: buildFederatedSchema([
    { typeDefs, resolvers }
  ])
});
server.applyMiddleware({ app });

const config: Config = Environment.getConfig();

app.listen({port: config.port}, () => {
  console.log(`${config.serviceName} ready at port: ${config.port}`)
});
