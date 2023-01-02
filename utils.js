const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connectToDb = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/rent-book');
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
    appStarter
}