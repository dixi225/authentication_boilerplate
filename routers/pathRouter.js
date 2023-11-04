const express=require('express')
const { getAllPosts } = require('../controllers/postsController')
const requireLogin = require('../middlewares/requireUser')
const pathRouter=express.Router()

pathRouter.get('/all',requireLogin,getAllPosts)

module.exports=pathRouter       