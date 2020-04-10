import Knex from 'knex';

export class ProductConnector {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getFirstProduct() {
    return this.knex.select('*').from('product').first();
  }

  async getProductsByOwnerId(ownerId: number) {
    return this.knex.select('*').from('product').where({ ownerId });
  }

  async getUserWishList(userId: number) {
    let subQuery = this.knex
        .select('productId')
        .from('wish_list')
        .where({userId});
    return this.knex
        .select('*')
        .from('product')
        .where('id', 'in', subQuery);
  }
}
