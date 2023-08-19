import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../services/users-thunks";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData.entries());

        const username = formObj.username;
        const password = formObj.password;

        try {
            await dispatch(loginThunk({ username, password }));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="border-double flex justify-center items-center">
            <div className="w-full max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="username" name="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" name="password" type="password" placeholder="*******" />
                    </div>
                    <div className="flex items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Log In
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline" onClick={() => { navigate("/register") }}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;