import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function Logout() {

    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/sign-in");
    };

    return (
        <button onClick={handleClick} className="flex justify-center items-center p-2 rounded-md bg-[#9a86f3] border-none cursor-pointer">
            <BiPowerOff className="text-[1.3rem] text-[#ebe7ff]" />
        </button>
    );
}

export default Logout;
