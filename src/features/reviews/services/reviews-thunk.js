import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewsService from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
    "reviews/createReview", async (review) => {
        const newReview = await reviewsService.createReview(review);
        return newReview;
    }
)

export const findAllReviewsForChannelThunk = createAsyncThunk(
    "reviews/findReviewsByTwitchId", async (twitch_id) => {
        const reviews = await reviewsService.findAllReviewsForChannel(twitch_id);
        return reviews;
    }
)

export const findAllReviewsForUserThunk = createAsyncThunk(
    "reviews/findReviewsByUserId", async (user_id) => {
        const reviews = await reviewsService.findAllReviewsForUser(user_id);
        return reviews;
    }
)

export const findUserMostRecentReviewThunk = createAsyncThunk(
    "reviews/findUserMostRecentReview", async (user_id) => {
        const review = await reviewsService.findUserMostRecentReview(user_id);
        return review;
    }
)

export const findRecentReviewsThunk = createAsyncThunk(
    "reviews/findRecentReviews", async (limit) => {
        const reviews = await reviewsService.findRecentReviews(limit);
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

export const updateReviewThunk = createAsyncThunk(
    "reviews/updateReview", async (review) => {
        const updatedReview = await reviewsService.updateReview(review);
        return updatedReview;
    }
)










