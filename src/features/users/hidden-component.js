import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HiddenComponent({ children }) {
    // while loading, hide body content. Show it when done
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);

    // on component load
    useEffect(() => {
        const load = async () => {
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