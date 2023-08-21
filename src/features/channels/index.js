import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { createReviewThunk, findAllReviewsForChannel } from "../reviews/services/reviews-thunk";

import * as twitchService from "../../services/twitch-service";
import { addCommasToNums } from "../../utils/addCommasToNums";

import Review from "../reviews";
import ReviewsList from "../reviews/reviews-list";

function Channel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // URL params
    const { twitch_id } = useParams();

    // redux state
    const { reviews } = useSelector((state) => { return state.reviews });
    const { currentUser } = useSelector((state) => { return state.user });

    // local state
    const [channelDetails, setChannelDetails] = useState({});
    const [currentUsersReview, setCurrentUsersReview] = useState(null);



    // Queries twitch api to find twitch statistics for this channel
    // Queries backend to find reviews for the channel
    const findChannelDetails = async () => {
        const channel = await twitchService.findUser(twitch_id);
        const followersCount = await twitchService.findFollowerCount(twitch_id);

        const channelInfo = channel.data[0];
        channelInfo.followersCount = followersCount;

        await dispatch(findAllReviewsForChannel(twitch_id));
        setChannelDetails(channelInfo);
    }

    // if there is a current user, find if they made a review for this channel
    const findCurrentUserReview = () => {
        if (currentUser) {
            const userReviewIndex = reviews.findIndex((review) => {
                return review.user_id === currentUser._id;
            });

            if (userReviewIndex !== -1) {
                const userReview = reviews.splice(userReviewIndex, 1)[0];
                setCurrentUsersReview(userReview);
            }
        }
    }

    // find channel details once on page load
    useEffect(() => {
        findChannelDetails();
        findCurrentUserReview();
    }, []);

    const displayChannelDetails = () => {
        return (
            <div className="flex flex-col items-center">
                <img
                    className="w-1/2 h-1/2 md:w-1/3 md:h-1/3 lg:w-1/4 lg:h-1/4 rounded-full"
                    src={channelDetails.profile_image_url}
                    alt="profile image"
                />
                <div className="mt-4 text-center">
                    <h1 className="text-2xl font-bold">Channel Name</h1>
                    <p className="text-lg">{channelDetails.display_name}</p>
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold">Description</h2>
                    <p className="text-lg">{channelDetails.description}</p>
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">Followers</h3>
                    <p className="text-lg">{addCommasToNums(channelDetails.followersCount)}</p>
                </div>
                {/* If currentUser has not made a review for this channel, show create button, otherwise edit button */}
                {!currentUsersReview ?
                    <button onClick={() => { navigate(`/channels/details/${twitch_id}/reviews/create`) }} className="border border-gray-800">Create Review</button>
                    : <button onClick={() => { navigate(`/channels/details/${twitch_id}/reviews/${currentUsersReview.creator}/edit`) }} className="border border-gray-800">Edit Review</button>}

                {/* Display reviews  */}
                <h3 className="text-xl font-bold">Reviews</h3>
                <div className="w-1/2 border border-gray-800">
                    {reviews && <ReviewsList reviewsList={reviews} />}
                </div>
            </div>

        );
    }

    return (
        <div>
            {/* if channel details exist display */}
            {channelDetails && displayChannelDetails()}
        </div>
    );

}
export default Channel;