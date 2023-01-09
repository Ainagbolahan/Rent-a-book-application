const Joi = require('joi');


// Sign up validation
const signupSchema = Joi.object({
    username: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });


const validateSignupMiddleware = (req, res, next) => {
    try {
      let { error, value } = signupSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        message: "server issues",
      });
    }
  };

  //Login validation Data
  const loginSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string().min(8).required(),
  }).or("email", "username");

  const validateLoginMiddleware = (req, res, next) => {
    try {
      let { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        message: "server issues",
      });
    }
  };


  //Password change validation

  const passwordChangeSchema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
  });

  const validatePasswordChangeMiddleware = (req, res, next) => {
    try {
      let { error, value } = passwordChangeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      console.log(value);
      next();
    } catch (err) {
      return res.status(500).json({
        message: "server issues",
      });
    }
  };



  module.exports = {
    validateLoginMiddleware,
    validateSignupMiddleware,
    validatePasswordChangeMiddleware
  }