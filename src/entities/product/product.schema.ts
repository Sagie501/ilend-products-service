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
  
  input ProductInput {
    name: String
    description: String
    imageURI: String
    requestedPrice: Float
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
    products: [Product]
    wishList: [Product]
  }

  extend type Query {
    getProducts: [Product]
    getProductById(productId: ID!): Product
    getUserWishList(userId: ID!): [Product]
  }
  
  extend type Mutation {
    addProduct(ownerId: ID!, categoryId: ID!, product: ProductInput!): Product
    deleteProduct(productId: ID!): Boolean
    addToWishList(userId: ID!, productId: ID!): User
    removeFromWishList(userId: ID!, productId: ID!): User
  }
`;
