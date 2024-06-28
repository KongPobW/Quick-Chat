import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { AllMsgRoutes, SendMsgRoutes } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    const handleSendMsg = async (msg) => {
        await axios.post(SendMsgRoutes, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    const fetchAndSetMessages = async () => {
        if (currentChat) {
            const response = await axios.post(AllMsgRoutes, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
    };

    useEffect(() => {
        fetchAndSetMessages();
    }, [currentChat]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="grid grid-rows-[10%,80%,10%] gap-[0.1rem] overflow-hidden cr-md:grid-rows-[15%,70%,15%]">
            <div className="flex justify-between items-center px-8">
                <div className="flex items-center gap-4">
                    <img className="h-[3rem]" src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
                </div>
                <div className="text-white">
                    <h3>{currentChat.username}</h3>
                </div>
                <Logout />
            </div>
            <div className="flex flex-col gap-4 overflow-auto py-4 px-8">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`flex items-center ${message.fromSelf ? "flex justify-end" : "flex justify-start"}`}>
                                <div className={`max-w-[40%] p-4 text-lg rounded-xl text-gray-300 cr-md:max-w-[70%] ${message.fromSelf ? "bg-[#4f04ff21]" : "bg-[#9900ff20]"}`}>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    );
}

export default ChatContainer;
