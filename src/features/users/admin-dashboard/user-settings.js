import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateUserThunk } from "../services/users-thunks";

const UserSettings = ({ user }) => {
    const dispatch = useDispatch();

    const [thisUser, setThisUser] = useState(user);

    const updateUser = async () => {
        await dispatch(updateUserThunk(thisUser));
    }

    return (
        <li class="flex flex-row">
            <div class="flex items-center flex-1 p-4 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <Link to={`/profile/${user._id}`} class="relative block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </Link>
                </div>
                <div class="flex-1 pl-1 mr-16">
                    <div class="font-medium dark:text-white">
                        {user.username}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-200">
                        {user.email}
                    </div>
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-200">
                    <select value={thisUser.isAdmin} onChange={(e) => { setThisUser({ ...thisUser, isAdmin: e.target.value }) }}>
                        <option value={false}>User</option>
                        <option value={true}>Admin</option>
                    </select>
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-200 ml-4">
                    <button onClick={updateUser} type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150">
                        Update
                    </button>
                </div>
            </div>
        </li>

    );
}

export default UserSettings;