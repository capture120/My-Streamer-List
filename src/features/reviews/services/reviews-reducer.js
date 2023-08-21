import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, findAllReviewsForChannel, findReviewByUserIdAndTwitchIdThunk } from "./reviews-thunk";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        // currentChannelReviewByUser: null,
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
        // !!! Note !!! currentChannelReviewByUser will be reset to null on refresh
        // a potential issue is if user logs out this state will still be stored
        // [findReviewByUserIdAndTwitchIdThunk.fulfilled]: (state, { payload }) => {
        //     state.currentChannelReviewByUser = payload;
        // }

    },
});

export default reviewsSlice.reducer;