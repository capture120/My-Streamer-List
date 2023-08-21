import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const USERS_URL = `${SERVER_API_URL}`;

const api = axios.create({
    // configure axios to support cookies for passing credentials
    withCredentials: true,
    baseURL: USERS_URL,
});

export const createReview = async (review) => {
    const response = await api.post('/reviews', review);
    return response.data;
};


export const findAllReviewsForChannel = async (twitch_id) => {
    const response = await api.get(`/channels/${twitch_id}/reviews`);
    return response.data;
}

export const findReviewByUserIdAndTwitchId = async (userAndTwitchInfo) => {
    // console.log("AT SERVICE: " + JSON.stringify(userAndTwitchInfo));
    const { twitch_id, user_id } = userAndTwitchInfo;
    const response = await api.get(`/channels/${twitch_id}/reviews/${user_id}`);
    return response.data;
}

export const findReviewById = async (reviewId) => {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
}









/* currently not in use
export const updateReview = async (review) => {
    const response = await api.put(`/reviews/${review._id}`, review);
    return response.data;
};


*/