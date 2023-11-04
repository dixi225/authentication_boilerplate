const http=require('http')
const dotenv=require('dotenv')
const app=require('./app')
const {connectDB} =require('./dbConnect')
dotenv.config("./.env.js")

const PORT= process.env.port||4001 
const server=http.createServer(app);
const  startServer=async()=>{
    await connectDB()
    server.listen(PORT,()=>{
        console.log(`server starting at port : ${PORT}`);
    })
}
startServer()
