import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    owner: User
    category: Category
    name: String
    description: String
    pictureLinks: JSON
    requestedPrice: Float
    rating: Float
    comments: [Comment]
  }
  
  input ProductInput {
    name: String
    description: String
    pictureLinks: JSON
    requestedPrice: Float
    rating: Float
    ownerId: ID
    categoryId: ID
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
    getProductsByUserId(userId: ID!): [Product]
    getProductPriceSuggestion(product: ProductInput!): Float
  }
  
  extend type Mutation {
    addProduct(product: ProductInput!): Product
    updateProduct(productId: ID!, product: ProductInput!): Product
    removeProduct(productId: ID!): Boolean
    addNewRating(productId: ID!, rating: Float!): Product
    addToWishList(userId: ID!, productId: ID!): User
    removeFromWishList(userId: ID!, productId: ID!): User
  }
`;
