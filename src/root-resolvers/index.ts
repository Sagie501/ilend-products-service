import { resolvers as productsResolver } from '../entities/product/product.resolvers';
import { resolvers as categoryResolver } from '../entities/category/category.resolvers';
import { resolvers as commentResolver } from '../entities/comment/comment.resolvers';
import { mergeResolvers } from '@graphql-tools/merge';

export const rootResolvers = mergeResolvers([productsResolver, categoryResolver, commentResolver]);
