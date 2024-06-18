import React, { useEffect, useState } from "react";
import Robot from "../assets/robot.gif";

function Welcome() {

    const [userName, setUserName] = useState("");

    const updateUserName = async () => {
        setUserName(await JSON.parse(localStorage.getItem("chat-app-user")).username);
    };

    useEffect(() => {
        updateUserName();
    }, []);

    return (
        <div className="flex justify-center items-center text-white flex-col">
            <img className="h-[20rem]" src={Robot} />
            <h1 className="text-2xl">Welcome, <span className="text-[#4e0eff]">{userName}</span></h1>
        </div>
    );
}

export default Welcome;
