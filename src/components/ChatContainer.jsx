import React from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

function ChatContainer({ currentChat }) {

    const handleSendMsg = async (msg) => {
    };

    return (
        <div className="grid grid-rows-[10%,80%,10%] gap-[0.1rem] overflow-hidden custom-range:grid-rows-[15%,70%,15%]">
            <div className="flex justify-between items-center px-8">
                <div className="flex items-center gap-4">
                    <img className="h-[3rem]" src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
                </div>
                <div className="text-white">
                    <h3>{currentChat.username}</h3>
                </div>
                <Logout />
            </div>
            <div></div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    );
}

export default ChatContainer;
