import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@material-ui/icons";
// import { Users } from "../../dummyData";
import axios from "axios";
// timeago.js
import { format } from "timeago.js";
// import { Posts } from "../../dummyData";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    // likes
    const [likes, setLikes] = useState(post.likes.length);
    // has user liked the post?
    const [isLiked, setIsLiked] = useState(false);
    // comments
    const [comments, setComments] = useState(post.comments.length);
    // has user commented on the post?
    const [isCommented, setIsCommented] = useState(false);

    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);

    // likes
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    // comments
    useEffect(() => {
        setIsCommented(post.comments.includes(currentUser._id));
    }, [currentUser._id, post.comments]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    // likes
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {
                userId: currentUser._id,
            });
        } catch (err) {
            console.log(err.message);
        }
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };

    // comments
    const commentHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/comment", {
                userId: currentUser._id,
            });
        } catch (err) {
            console.log(err.message);
        }
        setComments(isCommented ? comments - 1 : comments + 1);
        setIsCommented(!isCommented);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link
                            to={`/profile/${user.username}`}
                            style={{
                                display: "flex",
                                textDecoration: "none",
                                alignItems: "center",
                                color: "rgb(100, 52, 52)",
                            }}
                        >
                            <img
                                className="postProfileImg"
                                // src={
                                // 	Users.filter(
                                // 		(user) => user.id === post?.userId
                                // 	)[0].profilePicture
                                // }
                                src={
                                    user.profilePicture
                                        ? PublicFolder + user.profilePicture
                                        : PublicFolder + "person/noAvatar.png"
                                }
                                alt=""
                            />

                            <span className="postUsername">
                                {user.username}
                            </span>
                        </Link>
                        <span className="postDate">
                            {format(post.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img
                        className="postImg"
                        src={PublicFolder + post.img}
                        alt=""
                    />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src={PublicFolder + "like.png"}
                            onClick={likeHandler}
                            alt=""
                        />
                        <img
                            className="likeIcon"
                            src={PublicFolder + "heart.png"}
                            onClick={likeHandler}
                            alt=""
                        />
                        <span className="postLikeCounter">
                            {likes > 0 ? (
                                likes === 1 ? (
                                    <p>{likes} like</p>
                                ) : (
                                    <p>{likes} likes</p>
                                )
                            ) : (
                                ""
                            )}
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span
                            className="postCommentText"
                            onClick={commentHandler}
                        >
                            {comments > 0 ? (
                                comments === 1 ? (
                                    <p>{comments} comment</p>
                                ) : (
                                    <p>{comments} comments</p>
                                )
                            ) : (
                                "comment"
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
