import { gql } from 'apollo-server-express';
import { typeDefs as productsTypeDefs } from '../entities/product/product.schema';
import { typeDefs as categoryTypeDefs } from '../entities/category/category.schema';
import { typeDefs as commentTypeDefs } from '../entities/comment/comment.schema';
import { typeDefs as scalarsTypeDefs } from 'graphql-scalars';
import { mergeTypeDefs } from '@graphql-tools/merge';

export const rootTypeDefs = gql`${mergeTypeDefs([gql`${scalarsTypeDefs}`, categoryTypeDefs, productsTypeDefs, commentTypeDefs], {
  useSchemaDefinition: true,
  forceSchemaDefinition: true,
  throwOnConflict: true,
  commentDescriptions: true,
  reverseDirectives: true
})}`;
