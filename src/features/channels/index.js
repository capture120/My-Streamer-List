import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { findAllReviewsForChannelThunk, findReviewByUserIdAndTwitchIdThunk } from "../reviews/services/reviews-thunk";
import * as twitchService from "../../services/twitch-service";

import ReviewsList from "../reviews/reviews-list";
import FavoriteChannelButton from "./favorite-channel-button";
import TwitchChannelDetails from "./twitch-channel-details";

function Channel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // URL params
    const { twitch_id } = useParams();

    // redux state
    const { reviews } = useSelector((state) => { return state.reviews });
    const { currentUser } = useSelector((state) => { return state.user });

    // local state
    const [channel, setChannel] = useState(null);
    const [currentUsersReview, setCurrentUsersReview] = useState(null);

    // Queries backend to find reviews for the channel
    const findChannelDetails = async () => {
        const channel = await twitchService.findUser(twitch_id);
        if (!channel.data[0]) {
            return;
        } else {
            setChannel(channel.data[0]);
            await dispatch(findAllReviewsForChannelThunk(twitch_id));
        }
    }

    // if there is a current user, find if they made a review for this channel
    const findCurrentUserReview = async () => {
        if (currentUser) {
            const userReview = await dispatch(findReviewByUserIdAndTwitchIdThunk({ user_id: currentUser._id, twitch_id: twitch_id }))
            if (userReview.payload) {
                setCurrentUsersReview(userReview.payload);
            }
        }
    }

    // find channel details once on page load
    useEffect(() => {
        findChannelDetails();
        findCurrentUserReview();
    }, []);

    // only display profile if twitch_id links to a valid channel
    if (channel) {
        return (
            <div>
                {/* Channel Details from Twitch */}
                    <TwitchChannelDetails twitch_id={twitch_id} />
                <div className="flex flex-col items-center">
                    {/* Add as favorite channel */}
                    <FavoriteChannelButton twitch_id={twitch_id} />
                    {/* If currentUser has made a review for this channel, show edit button, otherwise show create button */}
                    {currentUsersReview ?
                        <button onClick={() => { navigate(`/channels/${twitch_id}/reviews/${currentUsersReview._id}/edit`) }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Edit Review</button>
                        : <button onClick={() => { navigate(`/channels/${twitch_id}/reviews/create`) }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Create Review</button>}
                    {/* Display reviews  */}
                    <h3 className="text-xl font-bold">Reviews</h3>
                    <div className="w-3/4 border border-gray-200 rounded-md">
                        {reviews && <ReviewsList reviewsList={reviews} />}
                    </div>
                </div>
            </div>
        );
    }

}
export default Channel;