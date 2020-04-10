import Knex from 'knex';
import { Category } from './category.model';

export class CategoryConnector {
  private knex: Knex<Category>;

  constructor(knex: Knex<Category>) {
    this.knex = knex;
  }

  async getUserFavoriteCategories(userId: number) {
    return this.knex
        .select('*')
        .from('category')
        .join('favorites_categories', 'category.id', '=', 'favorites_categories.categoryId')
        .where({userId});
  }
}
