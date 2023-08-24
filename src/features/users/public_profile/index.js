import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { findUserByIdThunk } from "../services/users-thunks";
import { findAllReviewsForUserThunk } from "../../reviews/services/reviews-thunk";
// profileThunk

import ReviewsList from "../../reviews/reviews-list";


function PublicProfile({ target_user_id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // find userid from target parameter or argument of this component
    const { user_id } = useParams();
    const uid = user_id || target_user_id;

    // get user, this profile, and the reviews made by this profile from redux store
    const { currentUser, publicProfile } = useSelector((state) => { return state.user });
    const { reviews } = useSelector((state) => { return state.reviews });

    const findReviewsForProfile = async (uid) => {
        await dispatch(findAllReviewsForUserThunk(uid));
    }

    const profileValidation = async (uid) => {
        // if user is logged in and viewing their own profile, redirect to profile screen
        const currentProfile = await dispatch(findUserByIdThunk(uid));
        if (currentUser && currentUser._id === uid) {
            navigate("/profile")
            return;
        }

        // if currentProfile is null, redirect to home screen
        if (!currentProfile.payload) {
            // navigate("/");
            return;
        }

        await findReviewsForProfile(uid);
    }

    useEffect(() => {
        profileValidation(uid);
    }, []);

    return (
        <div>
            <div>
                <h1>{publicProfile && publicProfile.username}'s Profile</h1>
                {/* Display reviews  */}
                <div>
                    <h3 className="text-xl font-bold">Favorite Channel</h3>
                    <div className="w-1/2 border border-gray-800">
                        {publicProfile ?
                            <Link to={`/channels/${publicProfile.favoriteChannel}`} >
                                {publicProfile.favoriteChannel}
                            </Link>
                            :
                            <div className="text-center">
                                This user has no favorite channel
                            </div>}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Reviews</h3>
                    <div className="w-1/2 border border-gray-800">
                        {(reviews.length > 0) ? <ReviewsList reviewsList={reviews} />
                            : <div className="text-center">This user has made no reviews</div>}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PublicProfile;