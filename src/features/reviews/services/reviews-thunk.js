import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewsService from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
    "reviews/createReview", async (review) => {
        const newReview = await reviewsService.createReview(review);
        return newReview;
    }
)

export const findReviewByIdThunk = createAsyncThunk(
    "reviews/findReviewById", async (review_id) => {
        const review = await reviewsService.findReviewById(review_id);
        return review;
    }
)