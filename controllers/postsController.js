const { success } = require("../utills/responseWrapper");

const getAllPosts=(req,res)=>{
    console.log(req._id);
    return res.send(success(200,"This is all the logged in data"))
}

module.exports={
    getAllPosts
}