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

// export const findStreamsByType = async (type = "", limit = 40) => {
//     const response = await twitch.get(`streams?type=${type}&first=${limit}`);
//     return response.data;
// };

// export const findCategories = async (name) => {
//     const response = await twitch.get(`search/categories?query=${name}&first=100`);
//     return response.data.data;
// }

// export const findStreamsByGame = async (name) => {
//     const response = await twitch.get(`streams?game=${name}&first=40`);
//     return response.data.streams;
// };

// export const findStreams = async (id, sort) => {
//     const response = await twitch.get(
//         `channels/${id}/videos?sort=${sort}&limit=10`
//     );
//     return response.data.videos;
// };

// export const findStreamInfo = async id => {
//     const response = await twitch.get(`streams/${id}`);
//     return response.data.stream;
// };

// export const findClips = async (query, value) => {
//     const response = await twitch.get(`${query}&period=${value}&limit=5`);
//     return response.data.clips;
// };

// export const getSearchOptions = async (type, value) => {
//     const response = await twitch.get(
//         `search/${type}?query=${value}&live=true`
//     );
//     return response.data;
// };

// export const findStreamsByGameAndViews = async name => {
//     const response = await twitch.get(
//         `videos/top?game=${name}&period=month&limit=12`
//     );
//     return response.data.vods;
// };

// export const findGames = async (limit = 60) => {
//     const response = await twitch.get(`games/top?limit=${limit}`);
//     return response.data.top;
// };