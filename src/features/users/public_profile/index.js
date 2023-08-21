import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { findUserByIdThunk, profileThunk } from "../services/users-thunks";
import { useEffect } from "react";

function PublicProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uid } = useParams();
    const { currentUser, publicProfile } = useSelector((state) => { return state.user });

    const checkIfCurrentUser = async (uid) => {
        if (currentUser && currentUser._id === uid) {
            navigate("/profile")
        } else {
            await dispatch(findUserByIdThunk(uid));
        }
    }

    useEffect(() => {
        checkIfCurrentUser(uid);
    });

    return (
        <div>
            {publicProfile && <h1>{publicProfile.username}'s Profile</h1>}
            {/* {JSON.stringify(publicProfile, null, 2)} */}
        </div>
    );
}

export default PublicProfile;