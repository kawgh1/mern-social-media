import "./Sidebar.css";

import React from "react";
import {
    Bookmark,
    Chat,
    Event,
    Group,
    HelpOutline,
    PlayCircleFilledOutlined,
    RssFeed,
    School,
    WorkOutline,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/closeFriend";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper scroller">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="">
                        <Link
                            to="/messenger"
                            style={{
                                textDecoration: "none",
                                display: "flex",
                                color: "lime",
                            }}
                        >
                            <Chat className="sidebarListItem" />
                            <span
                                style={{
                                    paddingTop: "2px",
                                    marginLeft: "10px",
                                }}
                            >
                                Chats{" "}
                            </span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    <li className="sidebarListItem"></li>
                </ul>
                {/* Button */}
                <div className="buttonDiv">
                    <button className="sidebarButton">Show More</button>
                </div>

                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((user) => (
                        <CloseFriend key={user.id} user={user} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
