import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersService from "./users-service";

export const findUserByIdThunk = createAsyncThunk(
    "user/findUserById", async (uid) => {
        const user = await usersService.findUserById(uid);
        return user;
    }
)

export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await usersService.login(credentials);
        return user;
    }
);

export const profileThunk = createAsyncThunk(
    "user/profile", async () => {
        const response = await usersService.profile();
        // console.log(`RESPONSE Thunk: ${JSON.stringify(response)}`);
        return response;
    }
);

export const logoutThunk = createAsyncThunk(
    "user/logout", async () => {
        return await usersService.logout();
    }
);

export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async (user) => {
        await usersService.updateUser(user);
        // console.log(`updateUserThunk: ${JSON.stringify(user)}`);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "user/register", async (credentials) => {
        const user = await usersService.register(credentials);
        return user;
    }
);