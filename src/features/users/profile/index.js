import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../services/users-thunks";

import PublicProfile from "../public_profile";

function Profile() {
    const { currentUser } = useSelector((state) => { return state.user });
    const [profile, setProfile] = useState(currentUser);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const save = async () => { await dispatch(updateUserThunk(profile)); };

    return (
        <div>
            <h1>Profile Screen</h1>
            <PublicProfile target_user_id={currentUser._id}/>
            {/* {profile && (
                <div>
                    <div>
                        <label>Email: </label>
                        <input type="text" value={profile.email}
                            onChange={(event) => {
                                const newProfile = {
                                    ...profile, email: event.target.value,
                                };
                                setProfile(newProfile);
                            }} />
                    </div>
                </div>
            )}
            <button onClick={save}>
                Save
            </button> */}
        </div>);

}
export default Profile;