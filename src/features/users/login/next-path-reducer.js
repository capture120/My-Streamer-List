import { createSlice } from "@reduxjs/toolkit";

const pathsSlice = createSlice({
    name: "users",
    initialState: {
        nextPath: null,
        previousPath: null
    },
    reducers: {
        saveNextPath(state, action) {
            state.nextPath = action.payload;
        },
        savePreviousPath(state, action) {
            state.previousPath = action.payload;
        }
    },
});

export const {saveNextPath, savePreviousPath} = pathsSlice.actions
export default pathsSlice.reducer;