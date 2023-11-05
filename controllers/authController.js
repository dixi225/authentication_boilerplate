const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const refreshTokenController=(req,res)=>{
    const { refreshToken }=req.body
    if(!refreshToken) return res.status(401).json("Refresh Token required")
    try {
        const secret=process.env.refreshKey
        const decoded=jwt.verify(refreshToken,secret)
        console.log(decoded);
        const _id=decoded._id
        const email=decoded.email
        const accessToken=generateAccessToken({
            _id,
            email
        })
        return res.status(200).json({"accessToken":accessToken})
    } catch (error) {
        res.status(401).json("Invalid Refresh Token")
    }
}

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
        const accessToken= generateAccessToken({
            _id:user._id,
            email:user.email,
        })
        const refreshToken= generateRefreshToken({
            _id:user._id,
            email:user.email,
        })        
        return res.status(200).json({'accessToken':accessToken,
                                    'refreshToken':refreshToken})
    }
    catch(err){
        console.log(err);
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
    const token =  jwt.sign(data,secret,{ expiresIn: '15m' })
    return token
}

module.exports={signUpController,logInController,refreshTokenController}