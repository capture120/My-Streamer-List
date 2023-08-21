import Review from "./index.js";

const ReviewsList = (reviewsObj) => {
    const reviewsList = reviewsObj.reviewsList;
    return (
        <div>
            {reviewsList.map((review) => <Review review={review} />)}
        </div>
    );
}

export default ReviewsList;