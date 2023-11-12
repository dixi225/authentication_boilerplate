const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    image:{
        publicId: String,
        URL: String
    },
    caption:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    // comments:[

    // ]
})
 
module.exports=mongoose.model('post',postSchema)