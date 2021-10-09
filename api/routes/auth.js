const router = require("express").Router();
// User Model
const User = require("../models/User");
// Bcrypt
const bcrypt = require("bcrypt");
const { request } = require("express");

router.get("/", (req, res) => {
	res.send("Hey it's authRoutes");
});

// REGISTER USER
router.post("/register", async (req, res) => {
	try {
		// generate salt
		const salt = await bcrypt.genSalt(10);
		// generate password
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		// create new user object
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// save user to DB and respond
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// LOGIN USER
router.post("/login", async (req, res) => {
	try {
		// check if user exists
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).json("User not found");

		// check if password matches
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(400).json("Wrong password");

		// all good? return user object
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(err);
	}
});

// REGISTER USER test using GET
// router.get("/register", async (req, res) => {
// 	const user = await new User({
// 		username: "john",
// 		email: "john@gmail.com",
// 		password: "123456",
// 	});

// 	await user.save();
// 	res.send("ok");
// });

module.exports = router;
