import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewsService from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
    "reviews/createReview", async (review) => {
        const newReview = await reviewsService.createReview(review);
        return newReview;
    }
)

export const findAllReviewsForChannel = createAsyncThunk(
    "reviews/findReviewsByTwitchId", async (twitch_id) => {
        const reviews = await reviewsService.findAllReviewsForChannel(twitch_id);
        return reviews;
    }
)

export const findReviewByUserIdAndTwitchIdThunk = createAsyncThunk(
    "reviews/findReviewByUserIdAndTwitchId", async (userAndTwitchInfo) => {
        const review = await reviewsService.findReviewByUserIdAndTwitchId(userAndTwitchInfo);
        return review;
    }
)

export const findReviewByIdThunk = createAsyncThunk(
    "reviews/findReviewById", async (review_id) => {
        const review = await reviewsService.findReviewById(review_id);
        return review;
    }
)




























/* currently not in use
*/