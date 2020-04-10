import * as _ from 'lodash';
import { resolvers as productsResolver } from '../entities/product/product.resolvers';
import { resolvers as categoryResolver } from '../entities/category/category.resolvers';

export const rootResolvers = _.merge(productsResolver, categoryResolver);
