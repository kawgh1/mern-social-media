import "./closeFriend.css";

export default function CloseFriend({ user }) {
	// public folder for photos
	const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className="sidebarFriend">
			<div className="sidebarFriendImgContainer">
				<img
					className="sidebarFriendImg"
					src={PublicFolder + user.profilePicture}
					alt=""
				/>
			</div>
			<span className="sidebarFriendName">{user.username}</span>
		</li>
	);
}
