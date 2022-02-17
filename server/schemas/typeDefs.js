// import the gql tagged template function
const { gql } = require('apollo-server-express');


// create our typeDefs
const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  posts: [Post]
  friends: [User]
}

type Post {
  _id: ID
  postText: String
  createdAt: String
  username: String
  replyCount: Int
  replies: [Reply]
}

type Reply {
  _id: ID
  replyBody: String
  createdAt: String
  username: String
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  posts(username: String): [Post]
  post(_id: ID!): Post
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addPost(postText: String!): Post
  addReply(postId: ID!, replyBody: String!): Post
  addFriend(friendId: ID!): User
}

type Auth {
  token: ID!
  user: User
}
`;

// export the typeDefs
module.exports = typeDefs;