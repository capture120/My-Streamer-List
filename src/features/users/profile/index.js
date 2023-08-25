import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUserThunk } from "../services/users-thunks";

import PublicProfile from "../public_profile";

function Profile() {
    const { currentUser } = useSelector((state) => { return state.user });
    const [profile, setProfile] = useState(currentUser);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const save = async () => {
        // console.log(`CURRENT USER: ${JSON.stringify(profile)}`);
        const actual = await dispatch(updateCurrentUserThunk(profile));
        // console.log(`ACTUAL: ${JSON.stringify(actual)}`);
        setIsEditing(false);
        setProfile(actual.payload);
        // console.log(`CURRENT USER: ${JSON.stringify(currentUser)}`);
    };

    return (
        // add default user icon
        // create flexbox/grid and have personal info on the left and public profile on the right
        <div>
            <div>
                <h1 className="text-2xl font-bold">Personal Information</h1>
                {/* {JSON.stringify(currentUser)} */}
                {(profile && !isEditing) &&
                    <div>
                        <div>
                            <label>Email: </label>{profile.email}
                        </div>
                        <div>
                            <button onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                        </div>
                    </div>
                }
                {(profile && isEditing) && (
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
                        <div>
                            <button onClick={save}>
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <PublicProfile target_user_id={currentUser._id} />
        </div>);

}
export default Profile;