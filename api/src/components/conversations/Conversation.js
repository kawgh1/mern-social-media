import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversation.css";

function Conversation({ conversation, currentUser }) {
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    // here user is the user that currentUser is chatting with in the conversation
    const [user, setUser] = useState(null);

    useEffect(() => {
        // if (conversation) {
        // friendId = userId of friend currentUser is chatting with
        const friendId = conversation.members.find(
            (member) => member !== currentUser._id
        );

        const getUser = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                console.log(res);
                setUser(res.data);
            } catch (err) {
                console.log(err, err.message);
            }
        };
        getUser();
        // } else {
        // conversation = {};
        // }
    }, [currentUser, conversation]);
    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.profilePicture
                        ? PublicFolder + user.profilePicture
                        : PublicFolder + "person/noAvatar.png"
                }
                alt={user ? user.username : ""}
            />
            <span className="conversationName">
                {user ? user.username : ""}
            </span>
        </div>
    );
}

export default Conversation;
