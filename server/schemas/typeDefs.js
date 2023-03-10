const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String!
  password: String!
  location: String!
  dogReference: [Dog]
}


type Auth {
  token: ID!
  user: User
}



type Dog {
  _id: ID!
  name: String!
  breed: String!
  bio: String!
  playStyle: String!
  media: [ID!]
  userReference: ID!
  endorsements: [Endorsement]
}

type Endorsement {
  playStyle: String
  counter: Int
}

type Media {
  _id: ID!
  content: String!
  isBanner: Boolean
  isProfile: Boolean
}

type Query {
  users: [User]
  user(userId: ID!): User
  dogs: [Dog]
  dog(dogId: ID!): Dog
  getDogMedia: [Media]
}

type Mutation {
  addUser(username: String!, password: String!, location: String!): Auth
  login(username: String!, password: String!): Auth
  updateUser(id: ID!, username: String, password: String, location: String, dogReference: ID): User
  deleteUser(id: ID!, username: String, password: String, location: String, dogReference: ID): User
  
  addDog(name: String!, bio: String!, playStyle: String!, breed: String!, media: [ID!], endorsements: [Endorsement]): Dog
  updateDog(dogId: ID!, name: String, bio: String, playStyle: String, breed: String!, media: [ID!], endorsements: [Endorsement]): Dog
  deleteDog(dogId: ID!): Dog
  
  addMedia(id: ID!, content: String!, isBanner: Boolean, isProfile: Boolean): Media

  updateEndorsementCounter(dogId: ID!, playStyle: String!, increment: Int!): Dog
`

module.exports = typeDefs;