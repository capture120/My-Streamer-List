import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, logoutThunk, profileThunk, updateUserThunk, findUserByIdThunk } from "./users-thunks";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        currentUser: null,
        publicProfile: null,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },

        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [profileThunk.rejected]: (state, { payload }) => {
            state.currentUser = null;
        },
        [profileThunk.pending]: (state, action) => {
            state.currentUser = null;
        },

        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },

        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },

        [findUserByIdThunk.fulfilled]: (state, { payload }) => {
            state.publicProfile = payload;
        }
    },
});

export default usersSlice.reducer;