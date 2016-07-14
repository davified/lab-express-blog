const mongoose = require('mongoose')
const User = require('./user')

const PostSchema = new mongoose.Schema({
  title: String,
  body: String
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
