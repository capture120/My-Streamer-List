import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "./services/users-thunks";
import Loading from "../../components/loading";

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
            <Loading />
        );
    } else {
        // show body content when done loading
        return children;
    }
}


export default AuthContext;