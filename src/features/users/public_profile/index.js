import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { findUserByIdThunk } from "../services/users-thunks";
import { findAllReviewsForUserThunk } from "../../reviews/services/reviews-thunk";

import ReviewsList from "../../reviews/reviews-list";
import TwitchChannelDetails from "../../channels/twitch-channel-details";


function PublicProfile({ target_user_id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // find userid from target parameter or argument of this component
    const { user_id } = useParams();
    const uid = user_id || target_user_id;

    // get user, this profile, and the reviews made by this profile from redux store
    const { currentUser, publicProfile } = useSelector((state) => { return state.user });
    const { reviews } = useSelector((state) => { return state.reviews });

    const findReviewsForProfile = async (uid) => {
        await dispatch(findAllReviewsForUserThunk(uid));
    }

    // if a logged in user is viewing their own profile, navigate to their personal profile screen
    const navigateToPersonalProfile = async () => {
        // if user is logged in and viewing their own profile 
        // given user not at their personal profile screen, redirect to profile screen
        if (location.pathname !== "/profile" && currentUser && currentUser._id === uid) {
            navigate("/profile")
            return;
        }

    }

    // determines if the profile is valid
    const isValidProfile = async (uid) => {
        // if currentProfile is null, redirect to home screen
        const currentProfile = await dispatch(findUserByIdThunk(uid));
        if (!currentProfile.payload) {
            navigate("/");
            return false;
        }

        await findReviewsForProfile(uid);
        return true;
    }

    useEffect(() => {
        if (isValidProfile(uid)) {
            navigateToPersonalProfile();
        }
    }, []);

    if (publicProfile) {
        return (
            <div className="flex justify-center border border-gray-200 rounded-md">
                <div className="m-1 w-4/5">
                    <h1 className="text-2xl font-bold">{publicProfile.username}'s Profile</h1>
    
                    {/* Display Favorite Channel */}
                    <div>
                        <h3 className="text-xl font-semibold">Favorite Channel</h3>
                        <div className="border border-gray-200 rounded-md">
                            {publicProfile.favoriteChannel ?
                                <Link to={`/channels/${publicProfile.favoriteChannel}`} >
                                    <TwitchChannelDetails twitch_id={publicProfile.favoriteChannel} />
                                </Link>
                                :
                                <div className="text-center">
                                    This user has no favorite channel
                                </div>}
                        </div>
                    </div>
    
                    {/* Display reviews  */}
                    <div>
                        <h3 className="text-xl font-semibold">Reviews</h3>
                        <div className="border border-gray-200 rounded-md">
                            {(reviews.length > 0) ? <ReviewsList reviewsList={reviews} />
                                : <div className="text-center">This user has made no reviews</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default PublicProfile;