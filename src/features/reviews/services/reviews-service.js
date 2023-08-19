import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const USERS_URL = `${SERVER_API_URL}/reviews`;

const api = axios.create({
    // configure axios to support cookies for passing credentials
    withCredentials: true,
    baseURL: USERS_URL,
});

export const updateReview = async (review) => {
    const response = await api.put(`/${review._id}`, review);
    return response.data;
};

export const createReview = async (review) => {
    const response = await api.post('', review);
    return response.data;
};

export const findReviewById = async (reviewId) => {
    const response = await api.get(`/${reviewId}`);
    return response.data;
}