import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
	// public folder for photos
	const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
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
						className="homeContainer"
						style={{
							backgroundImage: `url(${
								PublicFolder + "feed-colors2.jpg"
							})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center center fixed",
							backgroundSize: "cover",
						}}
					>
						<Sidebar />
						<Feed />
						<Rightbar />
					</div>
				</>
			) : isTablet ? (
				<>
					<Topbar />
					<div
						className="homeContainer"
						style={{
							backgroundImage: `url(${
								PublicFolder + "feed-colors2.jpg"
							})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center center fixed",
							backgroundSize: "cover",
						}}
					>
						<Sidebar />
						<Feed />
						<Footer />
					</div>
				</>
			) : (
				<>
					<Topbar />
					<div
						className="homeContainer"
						style={{
							backgroundImage: `url(${
								PublicFolder + "feed-colors2.jpg"
							})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center center fixed",
							backgroundSize: "cover",
						}}
					>
						<Feed />
						<Footer />
					</div>
				</>
			)}
		</>
	);
};

export default Home;
