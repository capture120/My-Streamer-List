import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="mt-4 text-center">
            <h3 className="text-md font-bold">Review by: {review.creator_name}</h3>
            <p className="text-lg">{review.review_content}</p>
            <p className="text-lg">{review.isRecommended ? "Recommended" : "Not-Recommended"}</p>
        </div>
    )
}

export default Review;