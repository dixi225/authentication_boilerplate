const express=require('express')
const userRouter=express.Router()
const {followController, getPostFromFollowing}=require('../controllers/userController')
const requireLogin = require('../middlewares/requireUser')


userRouter.post('/follow',requireLogin,followController)
userRouter.get('/getPostFromFollowings',requireLogin,getPostFromFollowing)
module.exports=userRouter   