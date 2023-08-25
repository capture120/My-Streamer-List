import { useSelector, useDispatch } from "react-redux";
import { createReviewThunk, findReviewByUserIdAndTwitchIdThunk } from "../reviews/services/reviews-thunk";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const CreateReview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // URL params
    const { twitch_id } = useParams();

    // redux state
    const { currentUser } = useSelector((state) => { return state.user });

    // local state
    const [review_content, setReview] = useState("");
    const [isRecommended, setIsRecommended] = useState("");

    // determines if a review already exists for the current user and channel
    const checkIfUserReviewed = async () => {
        // this is a protected route so there must be a user
        // !!! Despite "await" the store is not updated in time, will be updated in time at edit-review !!!
        const response = await dispatch(findReviewByUserIdAndTwitchIdThunk({ user_id: currentUser._id, twitch_id: twitch_id }));
        const existing_review = response.payload;
        if (existing_review) {
            navigate(`/channels/${twitch_id}/reviews/${existing_review._id}/edit`)
        }
    }

    // Validate user input and create review
    const handleCreateReviewButton = async () => {
        if (isRecommended === "" || review_content === "") {
            alert("Please fill out all fields");
            return;
        }

        await dispatch(createReviewThunk({
            twitch_id: twitch_id,
            review_content: review_content,
            isRecommended: isRecommended,
        }));
        setReview("");
        setIsRecommended("");
        navigate(`/channels/${twitch_id}`);

    }

    useEffect(() => {
        checkIfUserReviewed();
    }, [])
    return (
        <div className="flex justify-center">
            <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden w-3/4">
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-center mb-4">Create Review</h1>
                    <label class="text-gray-700" for="name">
                        <textarea onChange={(e) => { setReview(e.target.value) }} value={review_content} class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="content" placeholder="Write your review here..." name="content" rows="5" cols="40">
                        </textarea>
                    </label>
                    <div class="block relative w-full mb-4">
                        <select value={isRecommended} onChange={(e) => setIsRecommended(e.target.value )} class="block appearance-none w-full bg-white border border-gray-400px-4 py-2 pr-8 rounded shadow focus:outline-none ">
                            <option value={""}></option>
                            <option value={true}>Recommended</option>
                            <option value={false}>Not-Recommended</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <button onClick={handleCreateReviewButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                </div>
            </div>
        </div>
    )
};

export default CreateReview;