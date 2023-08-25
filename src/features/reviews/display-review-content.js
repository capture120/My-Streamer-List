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
            <div className="mt-4">
                <div className="px-6 py-4 bg-gray-200">
                    <p className="text-sm font-bold text-blue-500 hover:text-blue-700">{new Date(review.date_created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-lg">{review.review_content}</p>
                    <div className="flex flex-col items-center mt-2 sm:flex-row">
                        {review.isRecommended === true ? <div className="bg-blue-500 text-white font-bold rounded-full px-2 py-1 text-xs mr-2">{review.isRecommended} Recommended</div>
                            : <div className="bg-red-500 text-white font-bold rounded-full px-2 py-1 text-xs mr-auto">{review.isRecommended} Not Recommended</div>}
                        {currentUser && (currentUser._id === review.user_id || currentUser.isAdmin === true) &&
                            <button onClick={handleDelete} id='delete_button' className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mt-1 sm:ml-auto">
                                Delete
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayReviewContent;