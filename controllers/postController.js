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
  User.findById({_id: req.params.id}, function (err, user) {
    if (err) return res.status(401).json({error: '/get getAllPostsOfOneUser error 1'})
    res.status(200).json(user.posts)
  })
}

function getOnePostOfOneUser (req, res) {
  // var userId = req.params.id
  var postId = req.params.id
  console.log(req)
  Post.findById({_id: postId}, function (err, post) {
    if (err) console.log({message: 'no users found'})
    res.send(post)
  })
}

// needs to be fixed. can't access posts which are nested inside uesrs
function getPostById (req, res) {
  // getAllPosts(req, res)
  User.find({}).populate('posts').exec(function (err, users) {
    // Post.findById({_id: req.params.id}, function (err, post) {
    //   console.log(post)
    res.status(200).json(users)
  // })
  })
}

module.exports = {
  getAllPosts: getAllPosts,
  makeNewPost: makeNewPost,
  getPostById: getPostById,
  getAllPostsOfOneUser: getAllPostsOfOneUser,
  getOnePostOfOneUser: getOnePostOfOneUser
}
