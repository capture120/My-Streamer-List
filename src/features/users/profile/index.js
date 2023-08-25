import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUserThunk } from "../services/users-thunks";

import PublicProfile from "../public_profile";

function Profile() {
    const { currentUser } = useSelector((state) => { return state.user });
    const [profile, setProfile] = useState(currentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [originalEmail, setOriginalEmail] = useState(currentUser.email);

    const dispatch = useDispatch();
    const save = async () => {
        const actual = await dispatch(updateCurrentUserThunk(profile));
        setIsEditing(false);
        setProfile(actual.payload);
    };

    return (
        <div class="flex flex-col items-center mt-4 md:flex-row md:items-start">
            <div class="sm:ml-4 sm:mr-4">
                {(profile) &&
                    <div class="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className=" ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">Personal Information</div>
                            {(profile && !isEditing) &&
                                <div>
                                    <div className="text-xs md:text-sm">
                                        <label for="disabled-email" class="text-gray-700">
                                            Email
                                        </label>
                                        <input type="text" value={profile.email} id="disabled-email" disabled="" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email" />
                                    </div>
                                    <div>
                                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            }
                            {(profile && isEditing) && (
                                <div>
                                    <div className="text-xs md:text-sm">
                                        <label for="email">Email </label>
                                        <div class="relative" id="email">
                                            <input type="text" value={profile.email} id="rounded-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email" onChange={(event) => {
                                                const newProfile = {
                                                    ...profile, email: event.target.value,
                                                };
                                                setProfile(newProfile);
                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={save} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
            <div className="w-4/6">
                <PublicProfile target_user_id={currentUser._id} />
            </div>
        </div>
    );

}
export default Profile;