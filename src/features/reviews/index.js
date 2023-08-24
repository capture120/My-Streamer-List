import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import DisplayReviewContent from './display-review-content';

const Review = ({ review }) => {

    const { currentUser } = useSelector((state) => { return state.user });


    return (
        <div className="mt-4 text-center">
            {/* Reviewer name */}
            <Link to={`/profile/${review.creator._id}`}>
                <h3 className="text-md font-bold">Reviewed by: {review.creator.username}</h3>
            </Link>
            {/* Display Review Content */}
            {/* if the current user is the creator of the review, link to the edit review screen */}
            {(currentUser && currentUser._id === review.creator._id) ?
                <Link to={`/channels/${review.twitch_id}/reviews/${review._id}/edit`}><DisplayReviewContent review={review}/></Link> :
                <Link to={`/channels/${review.twitch_id}/reviews/${review._id}`}>
                    <DisplayReviewContent review={review}/>
                </Link>}

        </div>
    )
} // /channels/490592527/reviews/64e392ef8567483227993384/edit

export default Review;