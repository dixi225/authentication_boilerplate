const express=require('express')
const { getAllPosts } = require('../controllers/postsController')
const requireLogin = require('../middlewares/requireUser')
const postRouter=express.Router()

postRouter.get('/all',requireLogin,getAllPosts)

module.exports=postRouter       