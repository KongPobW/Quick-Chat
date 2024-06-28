import React, { useEffect, useState } from "react";

function Contact({ contacts, user, changeChat }) {

    const [userName, setUserName] = useState(undefined);
    const [userImage, setUserImage] = useState(undefined);
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {
        if (user) {
            setUserImage(user.avatarImage);
            setUserName(user.username);
        }
    }, [user]);

    const changeCurrentChat = (index, contact) => {
        setSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {userImage && userName && (
                <div className="grid grid-rows-[10%,75%,15%] overflow-hidden bg-[#080420]">
                    <div className="flex items-center gap-4 justify-center">
                        <h3 className="text-white uppercase text-2xl font-bold cr-sm:text-xl">QuickChat</h3>
                    </div>
                    <div className="flex flex-col items-center overflow-auto gap-3.5">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`min-h-[5rem] cursor-pointer w-[90%] rounded-md p-1.5 flex gap-4 items-center transition ease-in-out duration-500 ${index === selected ? "bg-[#9a86f3]" : "bg-[#ffffff34]"}`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div>
                                        <img className="h-[3rem]" src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                                    </div>
                                    <div className="username-contact text-white cr-md:text-base">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="bg-[#0d0d30] flex justify-center items-center gap-8 cr-sm:gap-4">
                        <div>
                            <img className="h-16 max-w-full" src={`data:image/svg+xml;base64,${userImage}`} />
                        </div>
                        <div className="username-contact text-white cr-md:text-base">
                            <h2>{userName}</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Contact;
