const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const signUpController = async (req,res)=>{

    try{
            const {email, password}=req.body
            if(!email||!password) return res.status(400)
            const oldUser=await User.findOne({email})
            if(oldUser) return res.status(400)
            const hashedPassword=await bcrypt.hash(password,10)
            const user=await User.create({
                email,
                password:hashedPassword
            })
            return res.status(201).json(user)
    }
    catch(err){
        console.log(err);
    }
}

const logInController= async(req,res)=>{
    
    try{
        
        const {email, password}=req.body
        if(!email||!password) return res.status(400)
        const user=await User.findOne({email})
        if(!user) return res.status(400).json("User not found")
        const match=await bcrypt.compare(password,user.password)
        if(!match) return res.status(400).json("Invalid Password")
        const token= generateToken({
            _id:user._id,
            email:user.email,
        })
        return res.status(200).json(token)
    }
    catch(err){
        console.log(err);
    }
}

const generateToken=  (data)=>{
    const secret=process.env.key
    const token =  jwt.sign(data,secret,{ expiresIn: '180s' })
    return token
}

module.exports={signUpController,logInController}