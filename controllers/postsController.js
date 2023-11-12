const User = require("../models/User");
const Post = require("../models/Post");
const { success, error } = require("../utills/responseWrapper");

const getAllPosts=(req,res)=>{
    return res.send(success(200,"This is all the logged in data"))
}

const createPost=async(req,res)=>{
    try {
        const{caption}=req.body
        const owner=req._id
         const user=await User.findById(owner)
        const post=await Post.create({
            caption,
            owner
        })
        user.posts.push(post._id)
        await user.save()
        return res.send(success(201,post))
    }   
    catch (e) 
    {
        return res.send(error(500,e.messege))
    }
}

const likeAndUnlikePostController=async(req,res)=>{

    const {postId}=req.body
    const post=await Post.findById(postId)
    const user=req._id
    if(!post)
    {
        return res.send(error(400,'post not found'))
    }
    try {
        if(post.likes.includes(user))
        {
            const index= post.likes.indexOf(user)
             post.likes.splice(index,1)
            await post.save()
            return res.send(success(201,'unliked post'))
        }
        else 
        {
             post.likes.push(user)
            await post.save()
            return res.send(success(201,'liked post'))
        }   
    } catch (e) {
        return error(500,e.messege)
    }

}



module.exports={
    getAllPosts,createPost,likeAndUnlikePostController,
}