import Knex from 'knex';

export class CategoryConnector {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getUserFavoriteCategories(userId: number) {
    return this.knex
        .select('*')
        .from('category')
        .join('favorites_categories', 'category.id', '=', 'favorites_categories.categoryId')
        .where({ userId });
  }

  async addFavoriteCategories(userId: number, categoriesIds: Array<number>) {
    let promises = [];
    for (let i = 0; i < categoriesIds.length; i++) {
      promises.push(
          this.knex.insert({
            userId,
            categoryId: categoriesIds[i]
          }).into('favorites_categories')
      );
    }
    return Promise.all(promises).then(() => {
      return this.knex.select('*').from('user').where({id: userId}).first();
    }, (err) => {
      throw new Error(err.sqlMessage);
    })
  }

  async removeFavoriteCategories(userId: number, categoriesIds: Array<number>) {
    let promises = [];
    for (let i = 0; i < categoriesIds.length; i++) {
      promises.push(
          this.knex('favorites_categories').where({
            userId,
            categoryId: categoriesIds[i]
          }).del()
      );
    }
    return Promise.all(promises).then(() => {
      return this.knex.select('*').from('user').where({id: userId}).first();
    }, (err) => {
      throw new Error(err.sqlMessage);
    })
  }
}
