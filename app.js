const  express=require('express')
const app=express()
const authRouter=require('./routers/authRouter')
const pathRouter =require('./routers/pathRouter')
//middlewares

app.use(express.json())
app.use('/auth',authRouter)   
app.use('/path',pathRouter)
module.exports=app