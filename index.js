require("dotenv").config();
const express = require("express");
const { indexController, authController } = require("./controllers");
const passport = require("passport");
const {
  validateSignupMiddleware,
  validateLoginMiddleware,
  validatePasswordChangeMiddleware,
} = require("./controllers/validators/auth.validation");
const { appStarter } = require("./utils");
const { getGoogleLogin, handleGoogleLogin } = require("./controllers/google.auth");
require("./controllers/google.auth");
const { appendFile } = require("fs");
const path = require("path");
const { changePasswordController } = require("./controllers/auth.controller");
const { verifyToken, checkIfAdmin } = require("./controllers/middlewares");
const { fetchAllBooks, addBookController } = require("./controllers/book.controller");
const { seedSuperAdmin } = require("./controllers/seed");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", indexController);

// Email Authentication

app.post("/signup", validateSignupMiddleware, authController.signupController);
app.post("/login", validateLoginMiddleware, authController.loginController);
app.put("/password",validatePasswordChangeMiddleware,verifyToken,changePasswordController)


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


app.get("/books", fetchAllBooks);
app.post("/books", checkIfAdmin, addBookController);

app.listen(port, appStarter(port));
