// import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
	// public folder for photos
	const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history = useHistory();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity("Passwords don't match!");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("/auth/register", user);
				history.push("/login");
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div
			className="register"
			style={{
				backgroundImage: `url(${PublicFolder + "profile-colors.jpg"})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center fixed",
				backgroundSize: "cover",
			}}
		>
			<div className="registerWrapper">
				<div className="registerLeft">
					<h3 className="registerLogo">reactsocial</h3>
					<span className="registerDesc">
						Connect with friends around the world!
					</span>
				</div>
				<div className="registerRight">
					<form className="registerBox" onSubmit={handleClick}>
						<input
							placeholder="Username"
							className="registerInput"
							required
							minLength="3"
							ref={username}
						/>
						<input
							placeholder="Email"
							className="registerInput"
							type="email"
							required
							ref={email}
						/>
						<input
							placeholder="Password"
							className="registerInput"
							type="password"
							minLength="6"
							required
							ref={password}
						/>
						<input
							placeholder="Confirm Password"
							className="registerInput"
							type="password"
							minLength="6"
							required
							ref={passwordAgain}
						/>
						<button className="registerButton" type="submit">
							Sign Up
						</button>
						<Link to="/login" className="loginRegisterButtonLink2">
							<button className="loginButton2" type="button">
								<img
									src={PublicFolder + "logo512.png"}
									alt="react"
									className="logo-img"
									style={{
										height: "29px",
										width: "29px",
										marginRight: "5px",
									}}
								/>
								Log In
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
