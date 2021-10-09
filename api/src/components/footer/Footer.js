import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Home, Mail, Notifications, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Footer() {
    // detect if on desktop or mobile
    const [isDesktop, setDesktop] = useState(window.innerWidth > 700);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 700);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <div>
            {isDesktop ? (
                ""
            ) : (
                <div className="footer">
                    <div className="footer__options">
                        {/* <HeaderOption Icon={HomeIcon} title="Home" />
            <HeaderOption Icon={SupervisorAccountIcon} title="Network" />
            <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
            <HeaderOption Icon={ChatIcon} title="Messaging" />
            <HeaderOption Icon={NotificationsIcon} title="Notifications" /> */}
                        <div className="footerIcons">
                            <div className="footerIconItem">
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                        display: "flex",
                                    }}
                                >
                                    <Home
                                        className="mui"
                                        style={{
                                            height: "35px",
                                            width: "35px",
                                            color: "white",
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="footerIconItem">
                                <Search
                                    className="mui"
                                    style={{ height: "35px", width: "35px" }}
                                />
                            </div>
                            <div className="footerIconItem">
                                <Notifications
                                    className="mui"
                                    style={{ height: "35px", width: "35px" }}
                                />
                                <span className="footerIconBadge">1</span>
                            </div>
                            <div className="footerIconItem">
                                <Link
                                    to="/messenger"
                                    style={{
                                        textDecoration: "none",
                                        display: "flex",
                                    }}
                                >
                                    <Mail
                                        className="mui"
                                        style={{
                                            height: "35px",
                                            width: "35px",
                                        }}
                                    />
                                </Link>

                                <span className="footerIconBadge">1</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Footer;
