import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

import React from "react";

function Rightbar({ profile }) {
	const HomeRightbar = () => {
		// public folder for photos
		const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
		return (
			<>
				<div className="birthdayContainer">
					<img
						className="birthdayImg"
						src={PublicFolder + "gift.png"}
						alt=""
					/>
					<span className="birthdayText">
						<b>Pola Foster</b> and <b>3 other friends</b> have a
						birhday today.
					</span>
				</div>
				<img
					className="rightbarAd"
					src={PublicFolder + "ad1.png"}
					alt="Ad"
				/>

				<h4 className="rightbarTitle">Online Friends</h4>
				<ul className="rightbarFriendList">
					{Users.map((user) => (
						<Online key={user.id} user={user} />
					))}
				</ul>
			</>
		);
	};

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				<HomeRightbar />
			</div>
		</div>
	);
}

export default Rightbar;
