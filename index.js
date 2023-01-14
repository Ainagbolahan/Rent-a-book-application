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
const {
	fetchAllBooks,
	addBookController,
	findByNameController,
	updateBooksController,
	findRandomBookController,
  deleteBookController,
} = require("./controllers/book.controller");
const { seedSuperAdmin } = require("./controllers/seed");
const {
	validatecreateBooksChangeSchema,
	validateupdateBooksChangeSchema,
  validateGeneralSearchSchema,
} = require("./controllers/validators/books.validation");
const { cartController } = require("./controllers/cart.controller");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Email Authentication and endpoint
app.get("/", indexController);
app.get("/books", fetchAllBooks);
app.get("/books/:title", verifyToken, findByNameController);

app.post("/signup", validateSignupMiddleware, authController.signupController);
app.post("/login", validateLoginMiddleware, authController.loginController);
app.post("/books", validatecreateBooksChangeSchema, checkIfAdmin, addBookController);
app.post("/search", verifyToken,validateGeneralSearchSchema, findRandomBookController);

app.put("/books", checkIfAdmin, validateupdateBooksChangeSchema, updateBooksController);
app.put("/password", validatePasswordChangeMiddleware, verifyToken, changePasswordController);

app.delete("/books/:id", checkIfAdmin, deleteBookController);
app.post("/cart/:id", verifyToken, cartController);
// Google Authentication

// Redirect the user to the Google signin page

app.get("/auth/google", getGoogleLogin);

// Retrieve user data using the access token received

app.get("/auth/google/callback", handleGoogleLogin);

app.listen(port, appStarter(port));
