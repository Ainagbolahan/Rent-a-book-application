require("dotenv").config();
const express = require("express");
const { indexController, authController } = require("./controllers");
const passport = require("passport");
const {
  validateSignupMiddleware,
  validateLoginMiddleware,
} = require("./controllers/validators/auth.validation");
const { appStarter } = require("./utils");
const { getGoogleLogin, handleGoogleLogin } = require("./controllers/google.auth");
require("./controllers/google.auth");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", indexController);

// Email Authentication

app.post("/signup", validateSignupMiddleware, authController.signupController);
app.post("/login", validateLoginMiddleware, authController.loginController);

// Google Authentication

// Redirect the user to the Google signin page

app.get("/auth/google",  getGoogleLogin);

// Retrieve user data using the access token received

app.get("/auth/google/callback", handleGoogleLogin);

// profile route after successful sign in
app.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});

app.listen(port, appStarter(port));
