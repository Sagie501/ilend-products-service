import { typeDefs as productsTypeDefs } from '../entities/products/products.schema'
import * as _ from 'lodash';

export const rootTypeDefs = _.merge(productsTypeDefs);
