const { Schema, model } = require('mongoose');
const replySchema = require('./reply');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
