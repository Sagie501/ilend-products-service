import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Category {
    id: ID!
    name: String
    description: String
    imageURI: String
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
    favoriteCategories: [Category]
  }
  
  extend type Query {
    getUserFavoriteCategories(userId: ID!): [Category]
  }
  
  extend type Mutation {
    addFavoriteCategories(userId: ID!, categoriesIds: [ID]!): User
    removeFavoriteCategories(userId: ID!, categoriesIds: [ID]!): User
  }
`;
