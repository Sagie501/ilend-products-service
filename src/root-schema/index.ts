import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';
import { typeDefs as productsTypeDefs } from '../entities/product/product.schema';
import { typeDefs as categoryTypeDefs } from '../entities/category/category.schema';


export const rootTypeDefs = gql`${mergeTypes([categoryTypeDefs, productsTypeDefs])}`;
