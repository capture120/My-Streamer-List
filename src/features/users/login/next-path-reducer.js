import { createSlice } from "@reduxjs/toolkit";

const pathsSlice = createSlice({
    name: "users",
    initialState: {
        nextPath: null
    },
    reducers: {
        saveNextPath(state, action) {
            state.nextPath = action.payload;
        },
    },
});

export const {saveNextPath} = pathsSlice.actions
export default pathsSlice.reducer;