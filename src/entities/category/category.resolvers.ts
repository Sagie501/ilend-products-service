export const resolvers = {
  Mutation: {
    addFavoriteCategories: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.addFavoriteCategories(args.userId, args.categoriesIds);
    }
  },
  User: {
    favoriteCategories: async (user, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.getUserFavoriteCategories(user.id);
    }
  }
};
