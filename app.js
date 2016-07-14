const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Post = require('./models/post')
const postController = require('./controllers/postController')
const userController = require('./controllers/userController')
const signInUpController = require('./controllers/signInUpController')

const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  next()
})
mongoose.connect('mongodb://default:defaultpassword@ds011963.mlab.com:11963/blog-app-david')

// ROUTING END POINTS TO THE APPROPRIATE FUNCTIONS
app.post('/signup', signInUpController.signUp)
app.post('/signin', signInUpController.signIn)

// GET ALL POSTS (these 2 end-points execute the same function)
app.get('/', postController.getAllPosts)
app.get('/posts', postController.getAllPosts)

// GET ONE POST (by id)
app.get('/posts/:id', userController.userLoggedIn, postController.getPostById)

// GET ALL USERS
app.get('/users', userController.getAllUsers)

// GET A SPECIFIC USER (by id)
app.get('/users/:user_id', userController.getOneUser)
app.get('/users/:user_id/posts', postController.getAllPostsOfOneUser)
app.get('/users/:user_id/posts/:id', postController.getOnePostOfOneUser)

/* AFTER USER IS LOGGED IN  */
// CREATE POST
app.post('/posts', userController.userLoggedIn, postController.makeNewPost)

// GET ONE POST (by id)
// app.get('/posts/:id', userController.userLoggedIn, postController.getOnePost)

// EDIT AND DELETE POSTS
app.route('/posts/:id')
  .put(userController.userLoggedIn, postController.updatePost)
  .delete(userController.userLoggedIn, postController.deletePost)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
