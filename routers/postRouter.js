const express=require('express')
const { getAllPosts, createPost, likeAndUnlikePostController } = require('../controllers/postsController')
const requireLogin = require('../middlewares/requireUser')
const postRouter=express.Router()

postRouter.get('/all',requireLogin,getAllPosts)
postRouter.post('/',requireLogin,createPost)
postRouter.post('/like',requireLogin,likeAndUnlikePostController)

module.exports=postRouter       