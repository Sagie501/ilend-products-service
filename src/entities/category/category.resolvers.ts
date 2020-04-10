export const resolvers = {
  User: {
    favoriteCategories: async (user, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.getUserFavoriteCategories(user.id);
    }
  }
};
