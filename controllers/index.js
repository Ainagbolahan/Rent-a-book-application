const authController = require("./auth.controller");


const indexController = (req,res)=>{
    return res
    .status(200)
    .json({ message: "welcome" });
};

module.exports={
    indexController,
    authController
}