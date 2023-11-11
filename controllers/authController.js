const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { error, success } = require('../utills/responseWrapper')

const refreshTokenController=(req,res)=>{
    const cookies=req.cookies
    if(!cookies) return res.send(error(400,'Send cookies with refresh tokens'))
    const refreshToken=cookies.refreshToken
    if(!refreshToken) return res.send(error(400,"Refresh Token required"))
    
    try {
        const secret=process.env.refreshKey
        const decoded=jwt.verify(refreshToken,secret)
        const _id=decoded._id
        const email=decoded.email
        const accessToken=generateAccessToken({
            _id,
            email
        })
      return res.send(success(200,{"accessToken":accessToken}))
        }
    catch (e) {
        console.log(e);
        return res.send(error(401,"Invalid Refresh Token"))
    }
}

const signUpController = async (req,res)=>{

    try{
            console.log(req.body);
            const {email, password}=req.body
            if(!email||!password)  return res.send(error(400,"Email or Password missing"))
            const oldUser=await User.findOne({email})
            if(oldUser) return res.send(error(400,"User already exists"))
            const hashedPassword=await bcrypt.hash(password,10)
            const user=await User.create({
                email,
                password:hashedPassword
            })
            return res.send(success(200,{"user":user}))
    }
    catch(err){
        console.log(err);
        return res.send(error(401,'anonymous error'))
    }
}

const logInController= async(req,res)=>{
    
    try{
        const {email, password}=req.body
        if(!email||!password) return res.send(error(400,"Email or Password missing"))
        const user=await User.findOne({email})
        if(!user) return res.send(error(400,"User not found"))
        const match=await bcrypt.compare(password,user.password)
        if(!match) return res.send(error(400,"Invalid Password"))
        const accessToken= generateAccessToken({
            _id:user._id,
            email:user.email,
        })
        const refreshToken= generateRefreshToken({
            _id:user._id,
            email:user.email,
        })  
        res.cookie('refreshToken',refreshToken,{
            secure:true,
            httpOnly:true
        })
        console.log('login success');
        return res.send(success(200,{"accessToken":accessToken}))
    }
    catch(err){
        console.log(`error at login ${err}`);
        return res.send(error(401,"Invalid Access Token"))
    }
}

//Internal functions 

const generateRefreshToken=  (data)=>{
    const secret=process.env.refreshKey
    const token = jwt.sign(data,secret,{ expiresIn: '1y' })
    return token
}

const generateAccessToken=  (data)=>{
    const secret=process.env.key
    const token =  jwt.sign(data,secret,{ expiresIn: '12s' })
    return token
}

module.exports={signUpController,logInController,refreshTokenController}