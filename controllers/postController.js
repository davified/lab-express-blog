const Post = require('../models/post')

function getAllPosts (req, res) {
  Post.find({}, function (err, postsArray) {
    if (err) return res.status(401).json({error: '/post getAllPosts error 1'})
    res.status(200).json(postsArray)
  })
}

function makeNewPost (req, res) {
  const post = new Post(req.body)

  post.save((err, post) => {
    if (err) return res.status(401).json({error: '/post makeNewPost error 1'})
    res.status(200).json({message: 'post created! yay! '})
  })
}

module.exports = {
  getAllPosts: getAllPosts,
  makeNewPost: makeNewPost
}
