export const resolvers = {
  Query: {
    getProducts: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProducts();
    },
    getProductById: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProductById(args.productId);
    }
  },
  Mutation: {
    addProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.addProduct(args.ownerId, args.categoryId, args.product);
    },
    deleteProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.deleteProduct(args.productId);
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
