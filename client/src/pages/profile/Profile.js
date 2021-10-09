import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import UserProfile from "../../components/userProfile/UserProfile";
import "./Profile.css";
// get username
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
	// Get current User pass 'username' as props
	const [user, setUser] = useState({});
	// get username from URL params react-router
	const username = useParams().username;
	// public folder for photos
	const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

	// get user by username
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);
	// detect if on desktop or mobile
	const [isTablet, setTablet] = useState(window.innerWidth > 700);
	const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

	const updateMedia = () => {
		setTablet(window.innerWidth > 700);
		setDesktop(window.innerWidth > 1000);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	return (
		<>
			{isDesktop ? (
				<>
					<Topbar />
					<div
						className="profile"
						style={{
							backgroundImage: `url(${
								PublicFolder + "profile-colors8.webp"
							})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center center fixed",
							backgroundSize: "cover",
						}}
					>
						<Sidebar />
						<UserProfile username={username} user={user} />
						<Rightbar />
					</div>
				</>
			) : isTablet ? (
				<>
					<Topbar />
					<div
						className="profile"
						style={{
							backgroundImage: `url(${
								PublicFolder + "profile-colors8.webp"
							})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center center fixed",
							backgroundSize: "cover",
						}}
					>
						<Sidebar />
						<UserProfile username={username} user={user} />
					</div>
				</>
			) : (
				<>
					<Topbar />
					<div
						className="profile"
						style={{
							backgroundImage: `url(${
								PublicFolder + "profile-colors8.webp"
							})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center center fixed",
							backgroundSize: "cover",
						}}
					>
						<UserProfile username={username} user={user} />
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default Profile;
