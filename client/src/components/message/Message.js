import React from "react";
import "./Message.css";

import { format } from "timeago.js";

function Message({ message, own }) {
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageBottom">{format(message.createdAt)}</div>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        own?.profilePicture
                            ? own.profilePicture
                            : PublicFolder + "person/noAvatar.png"
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
