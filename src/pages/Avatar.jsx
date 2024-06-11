import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AvatarRoutes } from "../utils/APIRoutes";

function Avatar() {

    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const fetchAndSetAvatars = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
    };

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/sign-in");
        }
    }, []);

    useEffect(() => {
        fetchAndSetAvatars();
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("please pick an avatar");
        } else {

            const user = await JSON.parse(localStorage.getItem("chat-app-user"));

            const { data } = await axios.post(`${AvatarRoutes}/${user._id}`, { image: avatars[selectedAvatar] });

            if (data.isSet) {

                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));

                navigate("/sign-in");

            } else {
                toast.error("error setting avatar. please try again");
            }
        }
    };

    return (
        <>
            <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
                <div>
                    <h1 className="text-2xl text-white font-bold">Pick an avatar</h1>
                </div>
                <div className="flex gap-8">
                    {avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`border-4 border-solid p-4 rounded-full flex justify-center items-center transition duration-500 ease-in-out ${selectedAvatar === index ? "border-purple-600" : ""}`}>
                                <img
                                    className="h-24 transition duration-500 ease-in-out"
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    key={avatar}
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <button onClick={setProfilePicture} className="bg-purple-700 text-white px-8 py-4 font-bold uppercase rounded-md text-lg hover:bg-purple-800 cursor-pointer">
                    Set Avatar
                </button>
            </div>
            <ToastContainer />
        </>
    );
}

export default Avatar;
