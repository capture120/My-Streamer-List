import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { findReviewByIdThunk } from './services/reviews-thunk';
import * as twitchService from "../../services/twitch-service";

import DisplayReviewContent from './display-review-content';

const ReviewScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [review, setReview] = useState(null);
    const [channel, setChannel] = useState(null);
    const { review_id } = useParams();

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
        <div className="mt-4">
            {/* Channel name */}
            <Link to={`/channels/${review.twitch_id}`}>
                <h3 className="text-md font-bold">Channel: {channel && channel.display_name}</h3>
            </Link>
            {/* Reviewer name */}
            <Link to={`/profile/${review.creator._id}`}>
                <h3 className="text-md font-bold">Reviewed by: {review.creator.username}</h3>
            </Link>
            <DisplayReviewContent review={review} />
        </div>
        : <></>
    )
}

export default ReviewScreen;