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
  savedTrips: [Post]
}
type Post {
  _id: ID
  location: String
  cost: Int
  pointsOfInterest: String
  transport: String
  extra: String
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
  addPost(location: String!, cost: Int!, pointsOfInterest: String!, transport: String!, extra: String!): Post
  addReply(postId: ID!, replyBody: String!): Post
  addFriend(friendId: ID!): User
  saveTrip(postId: ID!): Post
  removeTrip(_id:ID!, index: Int):Post
  removeFriend(_id:ID!,index:Int):User
  deletePost(postId:ID!):Post
  
}
type Auth {
  token: ID!
  user: User
}
`;

// export the typeDefs
module.exports = typeDefs;