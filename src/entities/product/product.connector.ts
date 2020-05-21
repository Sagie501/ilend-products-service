import Knex from 'knex';
import { Product } from './product.model';
import { default as axios } from 'axios';
import { Environment } from '../../environment/environment';

export class ProductConnector {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getProducts() {
    return this.knex.select('*').from('product');
  }

  async getProductById(productId: number) {
    return this.knex.select('*').from('product').where({ id: productId }).first();
  }

  async getProductsByOwnerId(ownerId: number) {
    return this.knex.select('*').from('product').where({ ownerId });
  }

  async getUserWishList(userId: number) {
    let subQuery = this.knex
        .select('productId')
        .from('wish_list')
        .where({ userId });
    return this.knex
        .select('*')
        .from('product')
        .where('id', 'in', subQuery);
  }

  async addProduct(ownerId: number, categoryId: number, product: Product) {
    let imgurConfig = Environment.getConfig().imgurConfig;
    let promises = [];
    for (let i = 0; i < product.pictureLinks.length; i++) {
      promises.push(axios.post(imgurConfig.url, {
        image: product.pictureLinks[i]
      }, {
        headers: {
          Authorization: `Client-ID ${imgurConfig.clientId}`
        }
      }));
    }

    let imgurResult = await Promise.all(promises);
    product.pictureLinks = JSON.stringify(imgurResult.map((res) => res.data.data.link));

    return this.knex.insert({ ownerId, categoryId, ...product }).into('product').then(([id]) => {
      return this.getProductById(id);
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }

  async updateProduct(productId: number, categoryId: number, product: Partial<Product>) {
    if (product.pictureLinks) {
      let imgurConfig = Environment.getConfig().imgurConfig;
      let promises = [];
      for (let i = 0; i < product.pictureLinks.length; i++) {
        promises.push(axios.post(imgurConfig.url, {
          image: product.pictureLinks[i]
        }, {
          headers: {
            Authorization: `Client-ID ${imgurConfig.clientId}`
          }
        }));
      }

      let imgurResult = await Promise.all(promises);
      product.pictureLinks = JSON.stringify(imgurResult.map((res) => res.data.data.link));
    }
    return this.knex('product').where({ id: productId }).update({ categoryId, ...product }).then(() => {
      return this.getProductById(productId);
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }

  async removeProduct(productId: number) {
    return this.knex('product').where('id', productId).del().then((res) => {
      if (res === 0) {
        throw new Error(`The product with id: ${productId} not found`);
      } else {
        return true;
      }
    }, (err) => {
      throw new Error(err.sqlMessage);
    })
  }

  async addToWishList(userId: number, productId: number) {
    return this.knex.insert({ userId, productId }).into('wish_list').then(() => {
      return this.knex.select('*').from('user').where({ id: userId }).first();
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }

  async removeFromWishList(userId: number, productId: number) {
    return this.knex('wish_list').where({ userId, productId }).del().then(() => {
      return this.knex.select('*').from('user').where({ id: userId }).first();
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }

  async addNewRating(productId: number, rating: number) {
    let product = await this.getProductById(productId);
    let numberOfRaters = product.numberOfRaters;
    let oldRating = product.rating;
    let newRating = (((oldRating * numberOfRaters) + rating) / (numberOfRaters + 1));
    return this.updateProduct(productId, product.categoryId, {
      rating: newRating,
      numberOfRaters: (numberOfRaters + 1)
    });
  }
}
