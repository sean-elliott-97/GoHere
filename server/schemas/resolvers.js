const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const ObjectId = require("mongoose").ObjectId;
const { assertObjectType } = require("graphql");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts")
          .populate("friends")
          .populate("savedTrips");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("posts");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("posts");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addReply: async (parent, { postId, replyBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: { replies: { replyBody, username: context.user.username } },
          },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    saveTrip: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedTrips: postId } },
          { new: true }
        ).populate("savedTrips");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeTrip: async (parent, { _id, index }, context) => {
      //index = parseInt(index);
      var savedTripsIndex = `savedTrips.${index}`;
      if (context.user) {
        var userUnsetTrip = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $unset: { [savedTripsIndex]: _id } },

          console.log(_id),
          console.log(index),
          { new: true }
        );
        // return userUnsetTrip;
      }
      if (context.user) {
        var userRemoveTrip = await User.findByIdAndUpdate(
          { _id: context.user._id },

          { $pull: { savedTrips: null } },

          console.log(_id),
          console.log(index),
          { new: true }
        );
        return userUnsetTrip + userRemoveTrip;
      }
      throw new AuthenticationError("You must be signed in to remove a trip");
    },
  },
};

module.exports = resolvers;