import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersService from "./users-service";

export const findAllUsersThunk = createAsyncThunk(
    "user/findAllUsers", async () => {
        const users = await usersService.findAllUsers();
        return users;
    }
)

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
        // console.log(`AT updateUser: ${JSON.stringify(user)}`);
        const newUser = await usersService.updateUser(user);
        return newUser;
    }
);

export const updateCurrentUserThunk = createAsyncThunk(
    "user/updateCurrentUser", async (user) => {
        const newUser = await usersService.updateCurrentUser(user);
        // console.log(`AT updateCurrentUser: ${JSON.stringify(newUser)}`);
        return newUser;
    }
);

export const registerThunk = createAsyncThunk(
    "user/register", async (credentials) => {
        const user = await usersService.register(credentials);
        return user;
    }
);