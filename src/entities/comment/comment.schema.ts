import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Comment {
    id: ID!
    user: User
    product: Product
    comment: String
    date: Long
  }
  
  extend type User @key(fields: "id") {
    id: ID! @external
  }
  
  extend type Mutation {
    addComment(userId: ID!, productId: ID!, comment: String!): Comment
    updateComment(commentId: ID!, comment: String!): Comment
    removeComment(commentId: ID!): Boolean
  }
`;
