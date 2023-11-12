const jwt=require('jsonwebtoken');
const { error } = require('../utills/responseWrapper');

const requireLogin=(req,res,next)=>{
    if(!req.headers||!req.headers.authorization||req.headers.authorization.split(" ")[0]!=="Bearer")
    {
        return res.send(error(400, "Enter Bearer token in aurthorization header"))
    }
    const accessToken=req.headers.authorization.split(" ")[1];
    const secret=process.env.key
    try {
        const decoded =jwt.verify(accessToken,secret)
        req._id=decoded._id     
        next()
    }
    catch (e) {
        console.log(e);
        return res.send(error(401,"Error :- Token not valid"))
    }
}    
module.exports=requireLogin