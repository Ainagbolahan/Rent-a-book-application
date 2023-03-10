const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signupController = async (req, res) => {
	try {
		//Check if a user already exist with same username or email
		let userExist = await User.findOne({
			$or: [{ email: req.body.email }, { username: req.body.username }],
		});

		if (userExist) {
			return res.status(400).json({
				message: "Account exist, login instead",
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

const loginController = async (req, res) => {
	try {
		// Make a call to the db to check if user exist
		let userExist = await User.findOne({
			$or: [{ email: req.body.email }, { username: req.body.username }],
		});

		// Return error to client if user has no account
		if (!userExist) {
			return res.status(404).json({
				message: "You have no account. signup instead",
			});
		}

		//Check if the password is authentic
		const passwordCorrect = userExist.checkPassword(req.body.password);

		if (!passwordCorrect) {
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
	} catch (err) {
		return res.status(500).json({
			message: "internal server issues",
		});
	}
};

const changePasswordController = async (req, res, next) => {
	try {
		//get request body
		const { password, oldPassword } = req.body;

		// Find user with id inside of token

		const user = await User.findById(req.user._id);

		// console.log(req);
		//Verify the old password
		let passwordCorrect = user.checkPassword(oldPassword);

		if (!passwordCorrect)
			return res.status(400).json({
				message: "incorrect password",
			});

		// Set the password key
		user.password = password;

		//Call the modelInstance .save() method
		user.save();
		return res.status(200).json({
			message: "password changed successfully",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "internal server issues",
		});
	}
};

module.exports = {
	signupController,
	loginController,
	changePasswordController,
};
