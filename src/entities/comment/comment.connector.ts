import Knex from 'knex';
import { Comment } from './comment.model';

export class CommentConnector {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getCommentById(commentId: number) {
    return this.knex.select('*').from('comment').where({ id: commentId }).first();
  }

  async getCommentsByProductId(productId: number) {
    return this.knex.select('*').from('comment').where({ productId });
  }

  async addComment(userId: number, productId: number, comment: string) {
    return this.knex.insert({userId, productId, comment, date: new Date().getTime()}).into('comment').then(([id]) => {
      return this.getCommentById(id);
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }

  async updateComment(commentId: number, comment: Comment) {
    return this.knex('comment').where({ id: commentId }).update(comment).then((id) => {
      return this.getCommentById(id);
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }

  async removeComment(commentId: number) {
    return this.knex('comment').where('id', commentId).del().then((res) => {
      if (res === 0) {
        throw new Error(`The product with id: ${commentId} not found`);
      } else {
        return true;
      }
    }, (err) => {
      throw new Error(err.sqlMessage);
    })
  }
}
