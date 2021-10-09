const router = require("express").Router();
// User Model
const User = require("../models/User");
// Bcrypt
const bcrypt = require("bcrypt");

// router.get("/", (req, res) => {
// 	res.send("Hey it's userRoutes");
// });

// UPDATE USER - PUT
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.user.isAdmin) {
		// User wants to update their password
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Your account has been updated");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can only update your own account!");
	}
});

// DELETE USER - DELETE
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Your account has been deleted");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can only delete your own account!");
	}
});

// GET A USER - GET
// router.get("/:id", async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		const { password, updatedAt, ...other } = user._doc;
// 		// dont return password or updatedAt, but everything else '...other'
// 		res.status(200).json(other);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

//get a user - with a query accepting either username or userId
router.get("/", async (req, res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get friends
router.get("/friends/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		// use Promise.all because we're going to map over all the friends
		const friends = await Promise.all(
			user.following.map((friendId) => {
				return User.findById(friendId);
			})
		);
		let friendList = [];
		friends.map((friend) => {
			const { _id, username, profilePicture } = friend;
			friendList.push({ _id, username, profilePicture });
		});
		res.status(200).json(friendList);
	} catch (err) {
		res.status(500).json(err);
		console.log(err.message);
	}
});

// FOLLOW A USER - PUT because we're updating our user Following array and the user followed's followers array
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({
					$push: { following: req.params.id },
				});
				res.status(200).json(user.username + " has been followed");
			} else {
				res.status(403).json("you already follow " + user.username);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you can't follow yourself");
	}
});

// UNFOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({
					$pull: { following: req.params.id },
				});
				res.status(200).json(user.username + " has been unfollowed");
			} else {
				res.status(403).json("you dont follow " + user.username);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you can't unfollow yourself");
	}
});

module.exports = router;
