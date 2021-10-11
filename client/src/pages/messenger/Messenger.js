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
import ChatHeader from "../../components/ChatHeader/ChatHeader";

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
    // const [socket, setSocket] = useState(null);
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // replaced with useRef above
    // useEffect(() => {
    //     setSocket(io("ws://localhost:8900"));
    // }, []);

    // useEffect(() => {
    //     socket?.on("welcome", (message) => {
    //         console.log(message);
    //     });
    // }, [socket]);

    // socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.following.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    // console.log("messages = ", messages);

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

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        // socket - this tells socket a new message was sent, so it can display in real time
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
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
                                            className="conversationInsideWrapper"
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
                                            <div className="chatBoxHeaderContainer">
                                                <ChatHeader
                                                    conversation={currentChat}
                                                    currentUser={user}
                                                />
                                            </div>
                                            <div className="chatBoxMessages">
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
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "white",

                                                top: "20%",
                                                textAlign: "center",
                                                padding: "10px",
                                                cursor: "default",
                                                fontSize: "24px",
                                                position: "absolute",
                                                textShadow:
                                                    "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px darkblue, 0 0 30px darkblue, 0 0 40px darkblue, 0 0 55px darkblue, 0 0 75px #49ff18",
                                            }}
                                        >
                                            Open a conversation to start a chat!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="chatOnline">
                            <div className="chatOnlineWrapperWrapper">
                                <span
                                    style={{
                                        color: "white",
                                        fontSize: "22px",
                                        padding: "10px",
                                    }}
                                >
                                    Friends Online
                                </span>
                                <div className="chatOnlineWrapper">
                                    {/* <ChatOnline />
                                    <ChatOnline />
                                    <ChatOnline /> */}
                                    <ChatOnline
                                        onlineUsers={onlineUsers}
                                        currentId={user._id}
                                        setCurrentChat={setCurrentChat}
                                    />
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
                                            className="conversationInsideWrapper"
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
                                            <div className="chatBoxHeaderContainer">
                                                <ChatHeader
                                                    conversation={currentChat}
                                                    currentUser={user}
                                                />
                                            </div>
                                            <div className="chatBoxMessages">
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
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "white",

                                                top: "20%",
                                                textAlign: "center",
                                                cursor: "default",
                                                fontSize: "24px",
                                                position: "absolute",
                                                padding: "10px",
                                                textShadow:
                                                    "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px darkblue, 0 0 30px darkblue, 0 0 40px darkblue, 0 0 55px darkblue, 0 0 75px #49ff18",
                                            }}
                                        >
                                            Open a conversation to start a chat!
                                        </span>
                                    </div>
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
