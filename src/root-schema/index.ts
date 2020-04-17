import { gql } from 'apollo-server-express';
import { mergeTypes } from 'merge-graphql-schemas';
import { typeDefs as productsTypeDefs } from '../entities/product/product.schema';
import { typeDefs as categoryTypeDefs } from '../entities/category/category.schema';
import { typeDefs as commentTypeDefs } from '../entities/comment/comment.schema';
import { typeDefs as scalarsTypeDefs } from 'graphql-scalars';


export const rootTypeDefs = gql`${mergeTypes([gql`${scalarsTypeDefs}`, categoryTypeDefs, productsTypeDefs, commentTypeDefs])}`;
