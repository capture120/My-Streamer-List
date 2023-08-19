import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { profileThunk } from "./services/users-thunks";

function ProtectedRoute({ children }) {
    // while loading, hide body content. Show it when done
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // on component load
    useEffect(() => {
        const load = async () => {
            // fetch profile from server
            const { payload } = await dispatch(profileThunk());
            // if there's no one logged in navigate to login screen
            if (!payload) {
                navigate("/login");
            }
            // otherwise show body content
            setLoading(false);
        };
        load();
    }, []);

    return (
        // show/hide body content while fetching profile
        <div className={`${loading ? "d-none" : ""}`}>
            {children}
        </div>
    );
}
export default ProtectedRoute;