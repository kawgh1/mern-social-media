import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ChatHeader.css";

function ChatHeader({ conversation, currentUser }) {
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    // here user is the user that currentUser is chatting with in the conversation
    const [friend, setFriend] = useState("");

    useEffect(() => {
        // if (conversation) {
        // friendId = userId of friend currentUser is chatting with
        const friendId = conversation.members.find(
            (member) => member !== currentUser._id
        );

        const getFriend = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                console.log(res);
                setFriend(res.data);
            } catch (err) {
                console.log(err, err.message);
            }
        };
        getFriend();
        // } else {
        // conversation = {};
        // }
    }, [currentUser, conversation]);
    return (
        <div
            className="chatHeader"
            style={{
                backgroundImage: `url(${
                    PublicFolder + "profile-colors7.webp"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center fixed",
                backgroundSize: "cover",
            }}
        >
            <Link to={`/profile/${friend.username}`}>
                <img
                    src={
                        friend.profilePicture
                            ? PublicFolder + friend.profilePicture
                            : PublicFolder + "person/noAvatar.png"
                    }
                    alt={friend ? friend.username : ""}
                    className="chatHeaderImg"
                />
            </Link>
            <span className="chatHeaderName">
                {friend ? friend.username : ""}
            </span>
        </div>
    );
}

export default ChatHeader;
