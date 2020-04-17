export const resolvers = {
  Query: {
    getCategories: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.getCategories();
    },
    getUserFavoriteCategories: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.getUserFavoriteCategories(args.userId,);
    }
  },
  Mutation: {
    addFavoriteCategories: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.addFavoriteCategories(args.userId, args.categoriesIds);
    },
    removeFavoriteCategories: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.removeFavoriteCategories(args.userId, args.categoriesIds);
    }
  },
  User: {
    favoriteCategories: async (user, args, { dataSources }) => {
      return await dataSources.productsDataSource.categoryConnector.getUserFavoriteCategories(user.id);
    }
  }
};
