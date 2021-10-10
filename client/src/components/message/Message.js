import React, { useEffect, useState } from "react";
import "./Message.css";

import { format } from "timeago.js";
import axios from "axios";

function Message({ message, own }) {
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    // here user is whoever sent the message,
    // could be current user or the user that current user is talking to
    const [user, setUser] = useState(null);

    useEffect(() => {
        // if (conversation) {
        // friendId = userId of friend currentUser is chatting with
        const friendId = message.sender;

        const getUser = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                // console.log(res);
                setUser(res.data);
            } catch (err) {
                console.log(err, err.message);
            }
        };
        getUser();
    }, [message]);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageBottom">{format(message.createdAt)}</div>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        // user?.profilePicture
                        //     ? PublicFolder + user.profilePicture
                        //     : PublicFolder + "person/noAvatar.png"
                        message.profilePicture
                    }
                    alt={own ? own.username : ""}
                />
                <p className="messageText">
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
                    {message.text}
                </p>
            </div>
        </div>
    );
}

export default Message;
