import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

function ChatInput({ handleSendMsg }) {

    const [message, setMessage] = useState("");

    const handleSend = (event) => {
        event.preventDefault();
        if (message.length > 0) {
            handleSendMsg(message);
            setMessage("");
        }
    };

    return (
        <div className="grid items-center grid-cols-[95%,5%] bg-[#080420] px-8 cr-md:px-4">
            <form className="w-full rounded-2xl flex items-center gap-8 bg-white/20" onSubmit={(event) => handleSend(event)}>
                <input
                    className="w-[100%] h-[60%] bg-transparent text-white border-none pl-4 text-[1.2rem] focus:outline-none"
                    type="text"
                    placeholder="type your message here..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button className="p-3.5 flex items-center justify-center bg-purple-600 cr-md:px-3 cr-md:py-1" type="submit">
                    <IoMdSend className="text-white text-2xl cr-md:text-base" />
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
