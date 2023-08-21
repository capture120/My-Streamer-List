import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, findAllReviewsForChannel, findReviewByUserIdAndTwitchIdThunk } from "./reviews-thunk";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: []
    },
    reducers: {},
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, { payload }) => {
            state.reviews.push(payload);
        },
        [findAllReviewsForChannel.fulfilled]: (state, { payload }) => {
            state.reviews = payload;
        },

    },
});

export default reviewsSlice.reducer;