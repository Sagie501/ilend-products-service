import { resolvers as productsResolver } from '../entities/products/products.resolvers'
import * as _ from 'lodash'

export const rootResolvers = _.merge(productsResolver);
