import {
    Chat,
    Notifications,
    Person,
    Search,
    Menu,
    Close,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logOutCall } from "../../apiCalls";

function Topbar() {
    const { user } = useContext(AuthContext);
    // detect if on desktop or mobile
    const [isDesktop, setDesktop] = useState(window.innerWidth > 700);
    // navbar open close
    const [navbarOpen, setNavbarOpen] = useState(false);
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const updateMedia = () => {
        setDesktop(window.innerWidth > 700);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    // navbar handleToggle
    const handleToggle = () => {
        setNavbarOpen((prev) => !prev);
    };

    // context from login
    const { dispatch } = useContext(AuthContext);
    // Sign out
    const handleSignOut = () => {
        logOutCall(dispatch);
    };

    // close mobile menu
    // const closeMenu = () => {
    // 	setNavbarOpen(false);
    // };

    return (
        <div>
            {isDesktop ? (
                <div className="topbarContainer">
                    <div className="topbarLeft">
                        <div className="topbarLeft">
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    display: "flex",
                                }}
                            >
                                <img
                                    src={PublicFolder + "logo512.png"}
                                    alt="react"
                                    className="logo-img-topbar"
                                />
                                <span className="logo">reactsocial</span>
                            </Link>
                        </div>
                    </div>
                    <div className="topbarCenter">
                        <div className="searchbar">
                            <Search className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Search for your friends!"
                                className="searchInput"
                            />
                        </div>
                    </div>
                    <div className="topbarRight">
                        <div className="topbarLinks">
                            <span className="topbarLink">Homepage</span>
                            <span className="topbarLink">Timeline</span>
                        </div>
                        <div className="topbarIcons">
                            <div className="topbarIconItem">
                                <Person />
                                <span className="topbarIconBadge">1</span>
                            </div>
                            <div className="topbarIconItem">
                                <Chat />
                                <span className="topbarIconBadge">2</span>
                            </div>
                            <div className="topbarIconItem">
                                <Notifications />
                                <span className="topbarIconBadge">1</span>
                            </div>
                        </div>
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    user.profilePicture
                                        ? PublicFolder + user.profilePicture
                                        : PublicFolder + "person/noAvatar.png"
                                }
                                alt=""
                                className="topbarImg"
                            />
                        </Link>
                        <nav className="navBar">
                            <button onClick={handleToggle}>
                                {navbarOpen ? (
                                    <Close className="hamburger-icon" />
                                ) : (
                                    <Menu className="hamburger-icon" />
                                )}
                            </button>
                            <ul
                                className={`menuNav ${
                                    navbarOpen ? " showMenu" : ""
                                }`}
                            >
                                <li>
                                    <Link
                                        to="/login"
                                        style={{
                                            textDecoration: "none",
                                            color: "white",
                                        }}
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            ) : (
                <div className="topbarContainer">
                    <div className="topbarLeft">
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                display: "flex",
                            }}
                        >
                            <img
                                src={PublicFolder + "logo512.png"}
                                alt="react"
                                className="logo-img-topbar"
                            />
                            <span className="logo">reactsocial</span>
                        </Link>
                    </div>

                    <Link to={`/profile/${user.username}`}>
                        <img
                            src={
                                user.profilePicture
                                    ? PublicFolder + user.profilePicture
                                    : PublicFolder + "person/noAvatar.png"
                            }
                            alt=""
                            className="topbarImg"
                        />
                    </Link>
                    <nav className="navBar">
                        <button onClick={handleToggle}>
                            {navbarOpen ? (
                                <Close className="hamburger-icon" />
                            ) : (
                                <Menu className="hamburger-icon" />
                            )}
                        </button>
                        <ul
                            className={`menuNav ${
                                navbarOpen ? " showMenu" : ""
                            }`}
                        >
                            <li>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Topbar;
