import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { findRecentReviewsThunk, findUserMostRecentReviewThunk } from "../reviews/services/reviews-thunk";

import HiddenComponent from "../users/hidden-component";
import ReviewsList from "../reviews/reviews-list";
import Review from "../reviews";


function Home() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => { return state.user });
  const { homeReviews } = useSelector((state) => { return state.reviews });

  const [recentUserReview, setRecentUserReview] = useState(null);

  const homeFindRecentReviews = async (limit) => {
    await dispatch(findRecentReviewsThunk(10));

    if (currentUser) {
      const response = await dispatch(findUserMostRecentReviewThunk(currentUser._id));
      const recentReview = response.payload;
      if (recentReview) {
        setRecentUserReview(recentReview);
      }
    }
  }

  useEffect(() => {
    homeFindRecentReviews(10);

  }, []);

  return (
    <div>
      <div className="m-12">
        {recentUserReview &&
          <div>
            <h2 className="text-center text-2xl font-extrabold">Your Recent Review</h2>
            <Review review={recentUserReview} />
          </div>}
        
      </div>
      <div>
        <h2 className="text-center text-2xl font-extrabold">Recent Reviews</h2>
        {homeReviews && <ReviewsList reviewsList={homeReviews} />}
      </div>
    </div>
  );
}

export default Home;