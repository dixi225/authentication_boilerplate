const success=(statusCode,messege)=>{
    return{
        status:'ok',
        statusCode:statusCode,
        messege:messege
    }
}
const error=(statusCode,err)=>{
    return{
        staus:'error',
        statusCode:statusCode,
        messege:err
    }
}

module.exports={success,error}