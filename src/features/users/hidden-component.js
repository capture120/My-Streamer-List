import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HiddenComponent({ children }) {
    const dispatch = useDispatch();

    // while loading, hide body content. Show it when done
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);

    // on component load
    useEffect(() => {
        const load = async () => {
            // even though the auth context that wraps this component is called once, we still need to double check
            // in the case of a server failure, the user will be logged out but the state will not update again

            // if there's no one logged in, do not display content
            if (currentUser) {
                // otherwise show body content
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        // show/hide body content while fetching profile
        <div className={`${loading ? "invisible" : ""}`}>
            {children}
        </div>
    );
}
export default HiddenComponent;