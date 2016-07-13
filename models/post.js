const mongoose = require('mongoose')
const User = require('./user')

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  // author: [User.schema]
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
