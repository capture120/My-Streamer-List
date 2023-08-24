import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../services/users-thunks";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => { return state.user });
    const { nextPath, previousPath } = useSelector((state) => { return state.paths });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogIn(event) {
        // ensure user has entered a username and password
        if (username === "" || password === "") {
            alert("Please fill out all fields");
            return;
        }
        const response = await dispatch(loginThunk({ username, password }));

        // if the user is not found, clear the fields and alert the user
        if (!response.payload) {
            setUsername("");
            setPassword("");
            alert("Username or password incorrect");
            return;
        }

        // if the user simply presses login, go back to the previous page
        // nextPath will only be "/login" if they press the login button while at a protected route
        // otherwise nextPath will be null
        if (nextPath === "/login" || nextPath === null) {
            navigate(previousPath);
        } else {
            navigate(nextPath);
        }
    }

    useEffect(() => {
        // if needed create reducer in paths called previousPath and save this "/login" as the previous path
        if (currentUser) {
            navigate("/");
        }
    }, []);

    return (
        <div className="border-double flex justify-center items-center">
            <div className="w-full max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input value={username} onChange={(e) => { setUsername(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="username" name="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" name="password" type="password" placeholder="*******" />
                    </div>
                    <div className="flex items-center">
                        <button onClick={handleLogIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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