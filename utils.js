const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);

const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to DB");
    }
    catch(err){
        console.log("Error connecting to DB");
    }
}

const appStarter = (port)=>{
    console.log("connected to port " +port);
    connectToDb();
};

module.exports = {
    appStarter,
    connectToDb
}