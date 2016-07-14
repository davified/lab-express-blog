const Post = require('../models/post')
const User = require('../models/user')

function getAllPosts (req, res) {
  let postsArray = []
  User.find({}, function (err, usersArray) {
    if (err) return res.status(401).json({error: '/get getAllPosts error 1'})
    for (let i = 0; i < usersArray.length; i++) {
      if (err) return res.status(401).json({error: '/get getAllPosts error 2'})
      for (let j = 0; j < usersArray[i].posts.length; j++) {
        postsArray.push(usersArray[i].posts[j])
      }
    }
    res.status(200).json(postsArray)
  })
}

function makeNewPost (req, res) {
  const user = req.currentUser
  const post = new Post(req.body)
  user.posts.push(post)

  user.save((err, post) => {
    if (err) return res.status(401).json({error: '/post makeNewPost error 1'})
    res.status(200).json({message: 'post created! yay! ', post})
  })
}

function getAllPostsOfOneUser (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) return res.status(401).json({error: '/get getAllPostsOfOneUser error 1'})
    res.status(200).json(user.posts)
  })
}

function getOnePostOfOneUser (req, res) {
  const postId = req.params.id
  User.findById(req.params.user_id, function (err, user) {
    if (err) return res.status(401).json({error: '/get getOnePostOfOneUser error 1'})
    const post = user.posts.id(postId)
    res.status(200).json(post)
  })

  Post.findById(req.params.id, function (err, post) {
    if (err) console.log({message: 'no post found'})
    res.status(200).json(post)
  })
}

// needs to be fixed. can't access posts which are nested inside uesrs
function getPostById (req, res) {
  const postId = req.params.id
  const post = req.currentUser.posts.id(postId)
  res.status(200).json(post)
}

function updatePost (req, res) {
  const postId = req.params.id
  var post = req.currentUser.posts.id(postId)
  post.title = req.body.title
  post.body = req.body.body
  req.currentUser.save((err) => {
    if (err) return res.status(401).json({error: err})
    res.status(200).json({message: 'Post updated', post})
  })
}

function deletePost (req, res) {
  const postId = req.params.id
  var post = req.currentUser.posts.id(postId)
  req.currentUser.posts.pull(post)
  req.currentUser.save((err) => {
    if (err) return res.status(401).json({error: err})
    res.status(200).json({message: 'Post deleted!'})
  })
}

module.exports = {
  getAllPosts: getAllPosts,
  makeNewPost: makeNewPost,
  getPostById: getPostById,
  getAllPostsOfOneUser: getAllPostsOfOneUser,
  getOnePostOfOneUser: getOnePostOfOneUser,
  updatePost: updatePost,
  deletePost: deletePost
}
