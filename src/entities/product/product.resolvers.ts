export const resolvers = {
  Query: {
    getFirstProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getFirstProduct();
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
