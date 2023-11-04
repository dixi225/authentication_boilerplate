const jwt=require('jsonwebtoken')

const requireLogin=(req,res,next)=>{
    if(!req.headers||!req.headers.authorization||req.headers.authorization.split(" ")[0]!=="Bearer")
    {
        return res.status(401).json("Enter Bearer token in aurthorization header")
    }
    const accessToken=req.headers.authorization.split(" ")[1];
    const secret=process.env.key
    try {
        const decoded =jwt.verify(accessToken,secret)
        req._id=decoded._id     
        next()
    }
    catch (error) {
        console.log(error);
        return res.status(401).json("Error :- Token not valid")
    }
}    
module.exports=requireLogin