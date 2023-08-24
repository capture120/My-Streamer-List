import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, updateUserThunk, logoutThunk, profileThunk, findUserByIdThunk, findAllUsersThunk, updateCurrentUserThunk } from "./users-thunks";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        editingUsers: [],
        currentUser: null,
        publicProfile: null,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            // console.log("loginThunk fulfilled")
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },

        [profileThunk.fulfilled]: (state, { payload }) => {
            // console.log("profileThunk fulfilled")
            state.currentUser = payload;
        },
        [profileThunk.rejected]: (state, { payload }) => {
            state.currentUser = null;
        },
        [profileThunk.pending]: (state, action) => {
            state.currentUser = null;
        },

        [updateUserThunk.fulfilled]: (state, { payload }) => {
        },

        [updateCurrentUserThunk.fulfilled]: (state, { payload }) => {
            // console.log("FULFILLED");
            // console.log(`PAYLOAD: ${JSON.stringify(payload)}`);
            // {"_id":"64df795e7b01e419ba91bc18","username":"test","email":"nice@gmail.com","favoriteChannel":"134750361","isAdmin":false,"__v":0};
            state.currentUser = payload;
        },

        [registerThunk.fulfilled]: (state, { payload }) => {
            // console.log("registerThunk fulfilled")
            state.currentUser = payload;
        },

        [findUserByIdThunk.fulfilled]: (state, { payload }) => {
            state.publicProfile = payload;
        },

        [findAllUsersThunk.fulfilled]: (state, { payload }) => {
            state.editingUsers = payload;
        }
    },
});

export default usersSlice.reducer;