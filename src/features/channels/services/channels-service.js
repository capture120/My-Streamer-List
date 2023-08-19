import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_API_BASE;
// URL to query api at middleware
const USERS_URL = `${SERVER_API_URL}/channels`;

const api = axios.create({
    // configure axios to support cookies for passing credentials
    withCredentials: true,
    baseURL: USERS_URL,
});


// doesn't query database, gets current user stored in express session
export const channels_profile = async () => {
    const response = await api.post(`/channels_profile`);
    return response.data;
};

export const updateChannel = async (user) => {
    const response = await api.put(`/${user._id}`, user);
    return response.data;
};

export const createChannel = async ({ username, password }) => {
    const response = await api.post(`/register`, { username, password });
    return response.data;
};

export const findChannelById = async (cid) => {
    const response = await api.get(`/${cid}`);
    return response.data;
}