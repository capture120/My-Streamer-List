import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { findReviewByIdThunk } from './services/reviews-thunk';

import DisplayReviewContent from './display-review-content';

const ReviewProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [review, setReview] = useState(null);
    const { review_id } = useParams();

    const findReview = async (review_id) => {
        const response = await dispatch(findReviewByIdThunk(review_id));
        if (!response.payload) {
            navigate("/");
        } else {
            setReview(response.payload);
        }
    }

    useEffect(() => {
        findReview(review_id);
    }, [])

    return (
        review ?
        <div className="mt-4 text-center">
            <Link to={`/profile/${review.creator._id}`}>
                <h3 className="text-md font-bold">Review by: {review.creator.username}</h3>
            </Link>
            <DisplayReviewContent review={review} />
        </div>
        : <></>
    )
}

export default ReviewProfile;