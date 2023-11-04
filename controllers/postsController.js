const getAllPosts=(req,res)=>{
    console.log(req._id);
    res.status(200).json("This is all the logged in data")
}

module.exports={
    getAllPosts
}