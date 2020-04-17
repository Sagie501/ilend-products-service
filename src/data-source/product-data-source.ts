import { SQLDataSource } from './sql-data-source';
import Knex from 'knex';
import { ProductConnector } from '../entities/product/product.connector';
import { CategoryConnector } from '../entities/category/category.connector';
import { CommentConnector } from '../entities/comment/comment.connector';

export class ProductDataSource extends SQLDataSource {
  public productConnector: ProductConnector;
  public categoryConnector: CategoryConnector;
  public commentConnector: CommentConnector;

  constructor(knexConfig: Knex.Config) {
    super(knexConfig);

    this.productConnector = new ProductConnector(this.knex);
    this.categoryConnector = new CategoryConnector(this.knex);
    this.commentConnector = new CommentConnector(this.knex);
  }
}
