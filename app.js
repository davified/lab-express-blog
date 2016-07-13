const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Post = require('./models/post')
const postController = require('./controllers/postController')
const userController = require('./controllers/userController')

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

app.post('/signup', (req, res) => {
  const user = new User(req.body)

  user.save((err, user) => {
    if (err) return res.status(401).json({error: '/signup error 1'})
    res.status(200).json({message: 'welcome! ', user})
  })
})

app.post('/signin', (req, res) => {
  const userParams = req.body

  User.findOne({email: userParams.email}, (err, user) => {
    if (err || !user) return res.status(401).json({error: '/signin error 1'})
    user.authenticate(userParams.password, (err, isMatch) => {
      if (err) return res.status(401).json({err: '/signin error 2'})
      res.status(200).json({message: 'sign in success! welcome: ' + user.name})
    })
  })
})

app.route('/')
  .get(postController.getAllPosts)

app.route('/users')
  .get(userController.getAllUsers)

app.get('/users/:id', userController.getOneUser)

  .put(function(req, res) {
    res.send('Update the book');
  })
  .delete(function(req, res) {
    res.send('Delete the book');
  })

app.route('/post')
  .get(postController.getAllPosts)
  .post(postController.makeNewPost)
  .put(function(req, res) {
    res.send('Update the book');
  })
  .delete(function(req, res) {
    res.send('Delete the book');
  })


app.route('/post')
  .get(postController.getAllPosts)
  .post(postController.makeNewPost)
  .put(function(req, res) {
    res.send('Update the book');
  })
  .delete(function(req, res) {
    res.send('Delete the book');
  })


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
