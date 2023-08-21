import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const EditReview = () => {
    const { currentChannelReviewByUser } = useSelector((state) => { return state.reviews });
    // const [currentUsersReview, setCurrentUsersReview] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <div>

        </div>
    )
};

export default EditReview;