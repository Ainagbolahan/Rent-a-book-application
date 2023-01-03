const { User } = require("../models/user.model");

const signupController = async (req, res) => {
  try {
    const userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (userExist) {
      return res.status(400).json({
        message: "User already Exist",
      });
    }
    const user = new User(req.body);
    const token = user.generateToken();
    await user.save();
    return res.status(201).json({
      message: "account created",
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        fullName: user.fullName,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};


const loginController = async (req,res)=>{
    try{
//Check if user exist
        const userExist =await User.findOne({
            $or:[{email:req.body.email},{username:req.body.username}]
        });
// if user does not exist alert to sign up
if(!userExist){
    return res.status(404).json({
        message: "Account not found. signup please",
      });
}
// check if password is correct
const passwordCorrect = userExist.checkPassword(req.body.password);
if(!passwordCorrect){
    return res.status(400).json({
        message: "incorrect password",
      });
}
// generate token
const token = userExist.generateToken();
// send token and user data to client
return res.status(200).json({
    message: "login successful",
    token,
    user: {
      _id: userExist._id,
      fullName: userExist.fullName,
      email: userExist.email,
      phone: userExist.phone,
      username: userExist.username,
    },
  });

    }catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
}

module.exports = {
  signupController,
  loginController
};
