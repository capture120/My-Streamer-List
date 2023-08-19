import axios from "axios";


const getAccessToken = async () => {
    const authURL = `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`;
    const response = await axios.post(authURL);
    const access_token = "Bearer " + response.data.access_token;
    return access_token;
}
const access_token = await getAccessToken();
const twitch = axios.create({
    baseURL: "https://api.twitch.tv/helix/",
    headers: {
        "Client-ID": process.env.REACT_APP_CLIENT_ID,
        Authorization: access_token
    }
});

export const searchChannels = async (username, num_results) => {
    const response = await twitch.get(`search/channels?first=${num_results}&query=${username}`);
    return response.data;
}


export const findUser = async (twitch_id) => {
    const response = await twitch.get(`users?id=${twitch_id}`);
    return response.data;
}

export const findFollowerCount = async (twitch_id) => {
    const response = await twitch.get(`users/follows?to_id=${twitch_id}&first=1`);
    return response.data.total;
}

// export const findStreamsByType = async (type = "", limit = 40) => {
//     const response = await twitch.get(`streams?type=${type}&first=${limit}`);
//     return response.data;
// };

// export const findCategories = async (name) => {
//     const response = await twitch.get(`search/categories?query=${name}&first=100`);
//     return response.data.data;
// }

// export const findGames = async (limit = 60) => {
//     const response = await twitch.get(`games/top?limit=${limit}`);
//     return response.data.top;
// };