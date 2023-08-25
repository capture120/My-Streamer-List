import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { deleteReviewThunk } from './services/reviews-thunk';

const DisplayReviewContent = ({ review }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => { return state.user });

    const handleDelete = async () => {
        const response = await dispatch(deleteReviewThunk(review._id));
        console.log(JSON.stringify(response));
        // navigate(`/channels/${review.twitch_id}`);
    }

    return (
        <div>
            <p className="text-lg">{review.review_content}</p>
            <p className="text-lg">{review.isRecommended ? "Recommended" : "Not-Recommended"}</p>
            <p className="text-lg">{review.date_created}</p>
            {currentUser && (currentUser._id === review.user_id || currentUser.isAdmin === true) &&
                <button onClick={handleDelete} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                    Delete
                </button>
            }
        </div>
    )
}

/*
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h5 className="card-title">{channel.name}</h5>
                        </div>
                    </div>
                </div>
            </div>
*/

export default DisplayReviewContent;