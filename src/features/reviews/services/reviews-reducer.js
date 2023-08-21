import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, findAllReviewsForChannel, findReviewByUserIdAndTwitchIdThunk } from "./reviews-thunk";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        currentChannelReviewByUser: null,
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
        [findReviewByUserIdAndTwitchIdThunk.fulfilled]: (state, { payload }) => {
            state.currentChannelReviewByUser = payload;
        }

    },
});

export default reviewsSlice.reducer;