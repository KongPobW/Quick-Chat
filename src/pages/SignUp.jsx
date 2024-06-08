import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SignUpRoutes } from "../utils/APIRoutes";

function SignUp() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(SignUpRoutes, {
                username,
                email,
                password,
            });

            if (data.status === false) {
                toast.error(data.msg);
            }

            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same");
            return false;
        } else if (username.length < 3) {
            toast.error("username should be greater than 3 characters");
            return false;
        } else if (password.length < 8) {
            toast.error("password should be equal or greater than 8 characters");
            return false;
        } else if (email === "") {
            toast.error("email is required");
            return false;
        }

        return true;
    };

    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
                <form action="" onSubmit={(event) => handleSubmit(event)} className="flex flex-col gap-8 bg-black/40 rounded-2xl p-12 px-20">
                    <div className="flex items-center justify-center gap-4">
                        <h1 className="text-white uppercase text-2xl font-bold">QuickChat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-[#997af0] focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-[#997af0] focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-[#997af0] focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-[#997af0] focus:outline-none"
                    />
                    <button type="submit" className="bg-[#4e0eff] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-base uppercase hover:bg-[#4e0eff]">
                        Sign Up
                    </button>
                    <span className="text-white uppercase">
                        Already have an account ? <Link className="text-[#4e0eff] no-underline font-bold" to="/sign-in">Sign In</Link>
                    </span>
                </form>
            </div >
            <ToastContainer />
        </>
    );
}

export default SignUp;
