const { Schema, model } = require('mongoose');
const replySchema = require('./Reply');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
  
    location: {
      type: String,
      required: 'Location required',
      minlength: 1,
      maxlength: 280
    },
    cost: {
      type: Number,
      required: 'cost required',
    },
    pointsOfInterest: {
      type: String,
      required: 'POI required',
      minlength: 1,
      maxlength: 280
    },   

    transport: {
      type: String,
      required: 'Transportation required',
      minlength: 1,
      maxlength: 280
    },
    extra: {
      type: String,
      required: 'Additional required',
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
