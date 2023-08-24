import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, findAllReviewsForChannelThunk, findAllReviewsForUserThunk, findRecentReviewsThunk} from "./reviews-thunk";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        homeReviews: []
    },
    reducers: {},
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, { payload }) => {
            state.reviews.push(payload);
        },
        [findAllReviewsForChannelThunk.fulfilled]: (state, { payload }) => {
            state.reviews = payload;
        },
        [findAllReviewsForUserThunk.fulfilled]: (state, { payload }) => {
            state.reviews = payload;
        },
        [findRecentReviewsThunk.fulfilled]: (state, { payload }) => {
            state.homeReviews = payload;
        }

    },
});

export default reviewsSlice.reducer;