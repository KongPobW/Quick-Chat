import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllUsersRoutes } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";

function Chat() {

    const navigate = useNavigate();

    const [user, setUser] = useState(undefined);
    const [contacts, setContacts] = useState([])
    const [chat, setChat] = useState(undefined);

    const getUserLocal = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/sign-in");
        } else {
            setUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        }
    };

    const fetchContacts = async () => {
        if (user) {
            if (user.isAvatarImageSet) {
                const data = await axios.get(`${AllUsersRoutes}/${user._id}`);
                setContacts(data.data);
            } else {
                navigate("/avatar");
            }
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [user]);

    useEffect(() => {
        getUserLocal();
    }, []);

    const handleChangeChat = (chat) => {
        setChat(chat);
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
            <div className="h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%,75%] custom-range:grid-cols-[35%,65%]">
                <Contact contacts={contacts} user={user} changeChat={handleChangeChat} />
                <Welcome />
            </div>
        </div>
    );
}

export default Chat;
