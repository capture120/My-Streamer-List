import { createAsyncThunk } from "@reduxjs/toolkit";
import * as channelsService from "./channels-service";

export const findChannelByIdThunk = createAsyncThunk(
    "channels/findChannelById", async (uid) => {
        const channel = await channelsService.findChannelById(uid);
        return channel;
    }
)

export const updateChannelThunk = createAsyncThunk(
    "channels/updateChannel", async (channel) => {
        await channelsService.updateChannel(channel);
        return channel;
    }
);

export const createChannelThunk = createAsyncThunk(
    "channels/register", async (credentials) => {
        const channel = await channelsService.createChannel(credentials);
        return channel;
    }
);