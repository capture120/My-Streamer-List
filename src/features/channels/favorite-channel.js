import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import { savePreviousPath } from "../users/login/next-path-reducer";
import { findReviewByUserIdAndTwitchIdThunk } from "../reviews/services/reviews-thunk";
import { updateUserThunk } from "../users/services/users-thunks";

const FavoriteChannel = ({ twitch_id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // the id of the channel that the current user has favorited
    const [currentUserFavorite, setCurrentUserFavorite] = useState(null);
    const { currentUser } = useSelector((state) => { return state.user });

    // if there is a current user, find if this channel is their favorite channel
    const findCurrentUserFavorite = () => {
        if (currentUser && currentUser.favoriteChannel === twitch_id) {
            setCurrentUserFavorite(twitch_id);
        }
    }

    // if the user is logged in, set this channel as their favorite channel
    const handleFavorite = async () => {
        if (!currentUser) {
            await dispatch(savePreviousPath(location.pathname));
            navigate("/login");
            return;
        }
        await dispatch(updateUserThunk({...currentUser, favoriteChannel: twitch_id }));
        setCurrentUserFavorite(twitch_id);
    }

    // if the user is logged in, set their favorite channel to null
    const handleUnfavorite = async () => {
        if (!currentUser) {
            await dispatch(savePreviousPath(location.pathname));
            navigate("/login");
            return;
        }
        await dispatch(updateUserThunk({...currentUser, favoriteChannel: null }));
        setCurrentUserFavorite(null);
    }

    useEffect(() => {
        findCurrentUserFavorite();
    }, []);

    return (
        <div>
            {currentUserFavorite ? <button onClick={handleUnfavorite} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Unfavorite</button>
                : <button onClick={handleFavorite} className="bg-transparent hover:bg-yellow-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Favorite</button>}
        </div>
    )
}

export default FavoriteChannel;