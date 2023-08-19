import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "./services/users-thunks";

// children is content in the body of this component
function AuthContext({ children }) {
    // to show/hide spinner or children. show spinner by default
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // on component load
    useEffect(() => {
        const load = async () => {
            // fetch profile from server, store it in reducer
            await dispatch(profileThunk());
            // hide spinner, render body content
            setLoading(false);
        };
        load();
    }, []);

    // if loading show spinner (by default)
    if (loading) {
        return (
            <div
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span className="invisible">Loading...</span>
            </div>
        );
    } else {
        // show body content when done loading
        return children;
    }
}


export default AuthContext;