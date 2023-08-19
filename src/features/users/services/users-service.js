import axios from 'axios';

/* 
    for local development: REACT_APP_API_BASE=http://localhost:4000/api
*/
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
// URL to query api at middleware
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({
    // configure axios to support cookies for passing credentials
    withCredentials: true,
    baseURL: USERS_URL,
});

// login service function
export const login = async ({ username, password }) => {
    const response = await api.post(`/login`, { username, password });
    return response.data;
};


// destroys session at REST API
export const logout = async () => {
    const response = await api.post(`/logout`);
    return response.data;
};

// doesn't query database, gets current user stored in express session
export const profile = async () => {
    const response = await api.post(`/profile`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`/${user._id}`, user);
    return response.data;
};

export const register = async ({ username, password }) => {
    const response = await api.post(`/register`, { username, password });
    return response.data;
};

export const findUserById = async (uid) => {
    const response = await api.get(`/${uid}`);
    return response.data;
}