export const resolvers = {
  Mutation: {
    addComment: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.commentConnector.addComment(args.userId, args.productId, args.comment);
    },
    updateComment: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.commentConnector.updateComment(args.commentId, args.comment);
    },
    removeComment: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.commentConnector.removeComment(args.commentId);
    }
  },
  Comment: {
    user: (comment) => {
      return { __typename: 'User', id: comment.userId };
    },
    product: (comment, args, { dataSources }) => {
      return dataSources.productsDataSource.productConnector.getProductById(comment.productId);
    }
  }
};
