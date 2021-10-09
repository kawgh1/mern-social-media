const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update a post - PUT postId

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Your post has been updated");
        } else {
            res.status(403).json("You can only update your own post");
        }
    } catch (err) {
        res.status(500).json(err, "did not receive a postId");
    }
});
//delete a post - DELETE postId

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Your post has been deleted");
        } else {
            res.status(403).json("You can only delete your own posts");
        }
    } catch (err) {
        res.status(500).json("error deleting post", err);
    }
});
//like / dislike a post - PUT postId

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // if post does not include user in likes, then like post
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            // otherwise, dislike the post
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//comment / uncomment a post - PUT postId

router.put("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // if post does not include user in likes, then like post
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been commented");
        } else {
            // otherwise, dislike the post
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been uncommented");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a post -- GET postId

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        // use Promise.all because there are multiple promises when we use 'map' - wont work otherwise
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        // return all of my currentUser posts PLUS the posts of everyone I currentUser follow
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
