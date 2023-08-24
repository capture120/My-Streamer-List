import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { updateReviewThunk, findReviewByIdThunk } from "./services/reviews-thunk";

function EditReview() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // URL params
    const { twitch_id, review_id } = useParams();

    // redux state
    const { currentUser } = useSelector((state) => { return state.user });

    // local state
    const [review, setReview] = useState({});

    // Validate user input and update review
    const handleSaveButton = async () => {
        if (review.isRecommended === "" || review.review_content === "") {
            alert("Please fill out all fields");
            return;
        }

        setReview({});
        await dispatch(updateReviewThunk(review));
        navigate(`/channels/${twitch_id}`);
    };

    // Check that review exists and belongs to current user, if so load review
    const loadReview = async () => {
        const { payload } = await dispatch(findReviewByIdThunk(review_id));
        if (payload && payload.creator._id === currentUser._id && payload.twitch_id === twitch_id) {
            setReview(payload);
        } else {
            navigate(`/channels/${twitch_id}`);
        }
    };

    useEffect(() => {
        loadReview();
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold">Edit Review</h1>
            <textarea className="border border-gray-800" placeholder="Write your review here..."
                onChange={(e) => { setReview({...review, review_content: e.target.value}) }} value={review.review_content}></textarea>
            <div class="block relative w-64">
                <select value={review.isRecommended} onChange={(e) => setReview({...review, isRecommended: e.target.value})} class="block appearance-none w-full bg-white border border-gray-400px-4 py-2 pr-8 rounded shadow focus:outline-none ">
                    <option value={""}></option>
                    <option value={true}>Recommended</option>
                    <option value={false}>Not-Recommended</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div>
                <button className="border border-gray-800" onClick={handleSaveButton}>Save</button>
            </div>
        </div>
    );

}
export default EditReview;