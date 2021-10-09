import { Send } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Footer from "../../components/footer/Footer";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./Messenger.css";
// socket io
import { io } from "socket.io-client";

function Messenger() {
    // public folder for photos
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    // detect if on desktop or mobile
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);
    // get currentUser
    const { user } = useContext(AuthContext);
    // console.log(user);

    // conversations
    const [conversations, setConversations] = useState([]);
    // chats
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    // new messages
    const [newMessage, setNewMessage] = useState("");
    // new message ref
    const scrollRef = useRef();

    // socket
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("ws://localhost:8900"));
    }, []);

    useEffect(() => {
        socket?.on("welcome", (message) => {
            console.log(message);
        });
    }, [socket]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                // console.log(res);
                setConversations(res.data);
            } catch (err) {
                console.log(err, err.message);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
                // console.log(res);
            } catch (err) {
                console.log(err, err.message);
            }
        };
        getMessages();
    }, [currentChat]);

    console.log("messages = ", messages);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 700);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    // handle new message button submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err, err.message);
        }
    };

    // message useEffect scroll to newest message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <>
            {isDesktop ? (
                <>
                    <Topbar />
                    <div
                        className="messenger"
                        style={{
                            backgroundImage: `url(${
                                PublicFolder + "profile-colors6.webp"
                            })`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center fixed",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="chatMenu">
                            <div className="chatMenuWrapper">
                                <input
                                    type="text"
                                    placeholder="Search for friends"
                                    className="chatMenuInput"
                                />
                                <div className="chatConversationWrapper">
                                    {/* <Conversation />
                                    <Conversation />
                                    <Conversation />
                                    <Conversation /> */}
                                    {conversations.map((conversation) => (
                                        <div
                                            key={conversation._id}
                                            onClick={() =>
                                                setCurrentChat(conversation)
                                            }
                                        >
                                            <Conversation
                                                conversation={conversation}
                                                currentUser={user}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="chatBox">
                            <div className="chatBoxWrapper">
                                {currentChat ? (
                                    <>
                                        <div className="chatBoxTop">
                                            {/* <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} /> */}
                                            {messages.map((message) => (
                                                <div
                                                    ref={scrollRef}
                                                    key={message._id}
                                                >
                                                    <Message
                                                        message={message}
                                                        own={
                                                            message.sender ===
                                                            user._id
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="chatBoxBottom">
                                            <div className="chatMessageContainer">
                                                <textarea
                                                    className="chatMessageInput"
                                                    name=""
                                                    placeholder="Write something..."
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                    onChange={(e) =>
                                                        setNewMessage(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={newMessage}
                                                ></textarea>
                                                <button
                                                    className="chatSubmitButton"
                                                    onClick={handleSubmit}
                                                >
                                                    <Send />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <span
                                        style={{
                                            color: "white",

                                            top: "10%",
                                            textAlign: "center",
                                            cursor: "default",
                                            fontSize: "24px",
                                            position: "absolute",
                                            marginLeft: "10%",
                                            textShadow:
                                                "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px darkblue, 0 0 30px darkblue, 0 0 40px darkblue, 0 0 55px darkblue, 0 0 75px #49ff18",
                                        }}
                                    >
                                        Open a conversation to start a chat!
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="chatOnline">
                            <div className="chatOnlineWrapperWrapper">
                                <div className="chatOnlineWrapper">
                                    <ChatOnline />
                                    <ChatOnline />
                                    <ChatOnline />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Topbar />
                    <div
                        className="messenger"
                        style={{
                            backgroundImage: `url(${
                                PublicFolder + "profile-colors6.webp"
                            })`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center fixed",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="chatMenu">
                            <div className="chatMenuWrapper">
                                <input
                                    type="text"
                                    placeholder="Search for friends"
                                    className="chatMenuInput"
                                />
                                <div className="chatConversationWrapper">
                                    {conversations.map((conversation) => (
                                        <div
                                            key={conversation._id}
                                            onClick={() =>
                                                setCurrentChat(conversation)
                                            }
                                        >
                                            <Conversation
                                                conversation={conversation}
                                                currentUser={user}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="chatBox">
                            <div className="chatBoxWrapper">
                                {currentChat ? (
                                    <>
                                        <div className="chatBoxTop">
                                            {/* <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} />
                                    <Message />
                                    <Message own={true} /> */}
                                            {messages.map((message) => (
                                                <div
                                                    ref={scrollRef}
                                                    key={message._id}
                                                >
                                                    <Message
                                                        message={message}
                                                        own={
                                                            message.sender ===
                                                            user._id
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="chatBoxBottom">
                                            <div className="chatMessageContainer">
                                                <textarea
                                                    className="chatMessageInput"
                                                    name=""
                                                    placeholder="Write something..."
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                    onChange={(e) =>
                                                        setNewMessage(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={newMessage}
                                                ></textarea>
                                                <button
                                                    className="chatSubmitButton"
                                                    onClick={handleSubmit}
                                                >
                                                    <Send />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <span
                                        style={{
                                            color: "white",
                                            position: "absolute",
                                            top: "10%",
                                            left: "50px",
                                            right: "50px",
                                            cursor: "default",
                                            fontSize: "24px",

                                            textShadow:
                                                "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px darkblue, 0 0 30px darkblue, 0 0 40px darkblue, 0 0 55px darkblue, 0 0 75px #49ff18",
                                        }}
                                    >
                                        Open a conversation to start a chat!
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}

export default Messenger;
