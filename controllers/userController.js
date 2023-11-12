const Post = require("../models/Post")
const User =require("../models/User")
const { success,error } = require("../utills/responseWrapper")

const followController=async(req,res)=>{
    const {personId}=req.body
    if(!personId) return res.send(error(400,"person id missing"))
    try {
        const userId=req._id
        if(userId===personId) return res.send(error(400,'you a loner?'))
        const followedUser=await User.findById(userId)
        if(!followedUser) return res.send(error(400,'no follow user exist'))
        const followingUser=await User.findById(personId)
        if(!followingUser) return res.send(error(400,'no following user exist'))

        if(followedUser.followers.includes(personId))
        {
            let index=followedUser.followers.indexOf(personId)
            followedUser.followers.splice(index,1)
            console.log('harsh2');
            index=followingUser.followings.indexOf(userId)
            console.log('harsh3');
            followingUser.followings.splice(index,1)
            await followedUser.save()
            await followingUser.save()   
            return res.send(success(201,' u started unfollowing him'))     
        }
        else
        {
            followedUser.followers.push(personId)
            followingUser.followings.push(userId)
            await followedUser.save()
            await followingUser.save()
            return res.send(success(201,' u started following him'))     
        }
    } catch (e) {
        console.log(e);
        return res.send(error(500,e.messege))
    }
    
}

const getPostFromFollowing=async(req,res)=>{
    const curUserId=req._id
    const curUser=await User.findById(curUserId)
    
    try {
        const posts=await Post.find({
            'owner':{
                '$in':curUser.followings
            }
         })
         return res.send(success(200,posts)) 
    } 
    catch (e) {
     return res.send(error(500,e))   
    }
}

module.exports={
    followController,getPostFromFollowing
}