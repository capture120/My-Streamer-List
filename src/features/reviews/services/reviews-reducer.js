import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk } from "./reviews-thunk";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        currentReview: null,
        reviews: []
    },
    reducers: {},
    extraReducers: {

        // [findChannelByIdThunk.fulfilled]: (state, { payload }) => {
        //     state.currentChannel = payload;
        // },

        [createReviewThunk.fulfilled]: (state, { payload }) => {
            state.reviews.push(payload);
            state.currentReview = payload;
        },
    },
});

export default reviewsSlice.reducer;