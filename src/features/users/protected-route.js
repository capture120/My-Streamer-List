import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import { profileThunk } from "./services/users-thunks";
import { saveNextPath } from "./login/next-path-reducer";

function ProtectedRoute({ children }) {
    // while loading, hide body content. Show it when done
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { currentUser } = useSelector((state) => { return state.user });

    // on component load
    useEffect(() => {
        const load = async () => {
            // fetch profile from server
            const { payload } = await dispatch(profileThunk());
            // if there's no one logged in navigate to login screen
            if (!payload) {
                // save the path the user was trying to access
                dispatch(saveNextPath(location.pathname));
                navigate("/login");
            }
            // otherwise show body content
            setLoading(false);
        };
        load();
    }, []);

    return (
        // show/hide body content while fetching profile
        <div className={`${loading ? "invisible" : ""}`}>
            {/* !!! IMPORTANT !!! If current user does not exist do not allow
             components to load (could cause null errors) */}
            {currentUser ? children : <div></div>}
        </div>
    );
}
export default ProtectedRoute;