import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { findReviewByIdThunk } from './services/reviews-thunk';
import * as twitchService from "../../services/twitch-service";

import DisplayReviewContent from './display-review-content';

const ReviewScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [review, setReview] = useState(null);
    const [channel, setChannel] = useState(null);
    const { review_id } = useParams();

    const { currentUser } = useSelector((state) => { return state.user });

    const findChannel = async (twitch_id) => {
        const channel = await twitchService.findUser(twitch_id);
        setChannel(channel.data[0]);
    }

    const findReview = async (review_id) => {
        const response = await dispatch(findReviewByIdThunk(review_id));
        if (!response.payload) {
            navigate("/");
        } else {
            setReview(response.payload);
            findChannel(response.payload.twitch_id);
        }
    }

    useEffect(() => {
        findReview(review_id);
    }, [])

    return (
        review ?
            <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4">
                    {/* Channel name */}
                    <Link to={`/channels/${review.twitch_id}`}>
                        <h3 className="text-md font-bold text-blue-500 hover:text-blue-700">Channel: {channel && channel.display_name}</h3>
                    </Link>
                    {/* Reviewer name */}
                    <Link to={`/profile/${review.creator._id}`}>
                        <h3 className="text-md font-bold text-blue-500 hover:text-blue-700">Reviewed by: {review.creator.username}</h3>
                    </Link>
                    {/* Review content */}
                    {(currentUser && currentUser._id === review.creator._id) ?
                        <Link to={`/channels/${review.twitch_id}/reviews/${review._id}/edit`}><DisplayReviewContent review={review} /></Link> :
                        <Link to={`/channels/${review.twitch_id}/reviews/${review._id}`}>
                            <DisplayReviewContent review={review} />
                        </Link>}
                </div>
            </div>

            : <></>
    )
}

export default ReviewScreen;