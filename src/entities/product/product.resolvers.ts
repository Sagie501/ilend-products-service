export const resolvers = {
  Query: {
    getProducts: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProducts();
    },
    getProductById: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProductById(args.productId);
    },
    getUserWishList: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getUserWishList(args.userId);
    }
  },
  Mutation: {
    addProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.addProduct(args.ownerId, args.categoryId, args.product);
    },
    deleteProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.deleteProduct(args.productId);
    },
    addToWishList: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.addToWishList(args.userId, args.productId);
    },
    removeFromWishList: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.removeFromWishList(args.userId, args.productId);
    }
  },
  Product: {
    owner: (product) => {
      return { __typename: "User", id: product.ownerId };
    }
  },
  User: {
    products: async (user, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProductsByOwnerId(user.id);
    },
    wishList: async (user, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getUserWishList(user.id);
    }
  }
};
