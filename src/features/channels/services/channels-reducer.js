import { createSlice } from "@reduxjs/toolkit";
import { updateChannelThunk, createChannelThunk, findChannelByIdThunk } from "./channels-thunks";


const channelsSlice = createSlice({
    name: "channels",
    initialState: {
        currentChannel: null,
    },
    reducers: {},
    extraReducers: {

        [findChannelByIdThunk.fulfilled]: (state, { payload }) => {
            state.currentChannel = payload;
        },

        [createChannelThunk.fulfilled]: (state, { payload }) => {
            state.currentChannel = payload;
        },
    },
});

export default channelsSlice.reducer;