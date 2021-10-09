import React from "react";
import "./Online.css";

function Online({ user }) {
	// public folder for photos
	const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className="rightbarFriend">
			<div className="rightbarProfileImgContainer">
				<img
					className="rightbarProfileImg"
					src={PublicFolder + user.profilePicture}
					alt=""
				/>
				<span className="rightbarOnline"></span>
			</div>
			<span className="rightbarUsername">{user.username}</span>
		</li>
	);
}

export default Online;
