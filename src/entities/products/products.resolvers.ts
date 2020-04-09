import { ProductsConnector } from './products.connector';

export const resolvers = {
  Query: {
    getFirstProduct: async () => {
      return await new ProductsConnector().getFirstProduct()
    }
  },
  Product: {
    owner: (product) => {
      return { __typename: "User", id: product.ownerId };
    }
  },
  User: {
    products: async (user) => {
      return await new ProductsConnector().getProductsByUserId(user.id)
    },
    wishList: async (user) => {
      return await new ProductsConnector().getUserWishList(user.id)
    },
    favoriteCategories: async (user) => {
      return await new ProductsConnector().getUserFavoriteCategories(user.id)
    }
  }
};
