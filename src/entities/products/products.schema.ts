import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    owner: User
    category: Category
    name: String
    description: String
    imageURI: String
    requestedPrice: Float
    rating: Float
  }
  
  type Category {
    id: ID!
    name: String
    description: String
    imageURI: String
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
    products: [Product]
    wishList: [Product]
    favoriteCategories: [Category]
  }

  extend type Query {
    getFirstProduct: Product
  }
`;
