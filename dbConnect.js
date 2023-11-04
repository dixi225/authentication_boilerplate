const mongoose =require('mongoose')

const MONGO_URL="mongodb+srv://harshdixit573:ChvbksO38qxPhjvZ@cluster0.gesy1bl.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.once('open',()=>{
    console.log("connected");
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})
const connectDB=async()=>{
    await mongoose.connect(MONGO_URL)
}
module.exports={connectDB,}