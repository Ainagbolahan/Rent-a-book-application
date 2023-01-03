require('dotenv').config();
const express = require("express");
const { indexController, authController } = require('./controllers');
const { validateSignupMiddleware,validateLoginMiddleware } = require('./controllers/validators/auth.validation');
const { User } = require('./models/user.model');
const { appStarter } = require("./utils");


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));








app.get("/", indexController);

app.post("/signup",validateSignupMiddleware,authController.signupController);
app.post("/login",validateLoginMiddleware,authController.loginController)



app.listen(port, appStarter(port));