const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        publicId: String,
        URL: String
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    followings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
})

module.exports=mongoose.model('user',userSchema)