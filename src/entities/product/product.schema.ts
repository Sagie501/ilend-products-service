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
  
  extend type User @key(fields: "id") {
    id: ID! @external
    products: [Product]
    wishList: [Product]
  }

  extend type Query {
    getFirstProduct: Product
  }
`;
