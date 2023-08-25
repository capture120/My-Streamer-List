import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as twitchService from "../../services/twitch-service";

import DisplayReviewContent from './display-review-content';

const Review = ({ review }) => {

    const { currentUser } = useSelector((state) => { return state.user });

    const [channel, setChannel] = useState(null);

    const findChannel = async (twitch_id) => {
        const channel = await twitchService.findUser(twitch_id);
        setChannel(channel.data[0]);
    }

    useEffect(() => {
        findChannel(review.twitch_id);
    }, [])
    return (
        <div className="mt-4 text-center">
            {/* Channel name */}
            <Link to={`/channels/${review.twitch_id}`}>
                <h3 className="text-md font-bold">Channel: {channel && channel.display_name}</h3>
            </Link>
            {/* Reviewer name */}
            <Link to={`/profile/${review.creator._id}`}>
                <h3 className="text-md font-bold">Reviewed by: {review.creator.username}</h3>
            </Link>
            {/* Display Review Content */}
            {/* if the current user is the creator of the review, link to the edit review screen */}
            {(currentUser && currentUser._id === review.creator._id) ?
                <Link to={`/channels/${review.twitch_id}/reviews/${review._id}/edit`}><DisplayReviewContent review={review} /></Link> :
                <Link to={`/channels/${review.twitch_id}/reviews/${review._id}`}>
                    <DisplayReviewContent review={review} />
                </Link>}

        </div>
    )
}

export default Review;