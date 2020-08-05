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
    },
    getProductsByUserId: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProductsByOwnerId(args.userId);
    },
    getProductPriceSuggestion: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProductPriceSuggestion(args.productId);
    }
  },
  Mutation: {
    addProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.addProduct(args.ownerId, args.categoryId, args.product);
    },
    updateProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.updateProduct(args.productId, args.categoryId, args.product);
    },
    removeProduct: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.removeProduct(args.productId);
    },
    addToWishList: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.addToWishList(args.userId, args.productId);
    },
    removeFromWishList: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.removeFromWishList(args.userId, args.productId);
    },
    addNewRating: async (source, args, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.addNewRating(args.productId, args.rating);
    }
  },
  Product: {
    owner: (product) => {
      return { __typename: 'User', id: product.ownerId };
    },
    category: (product, args, { dataSources }) => {
      return dataSources.productsDataSource.categoryConnector.getCategoryById(product.categoryId);
    },
    comments: (product, args, { dataSources }) => {
      return dataSources.productsDataSource.commentConnector.getCommentsByProductId(product.id);
    },
    __resolveReference: async (product, { dataSources }) => {
      return await dataSources.productsDataSource.productConnector.getProductById(product.id)
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
