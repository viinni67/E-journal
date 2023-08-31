const mongoose= require("mongoose");
const mongoURL="mongodb://127.0.0.1:27017";

const connectToMongo=()=>{
    mongoose.connect(mongoURL)
    console.log("connected ");   
}

module.exports=connectToMongo