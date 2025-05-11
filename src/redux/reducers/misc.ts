import { createSlice } from "@reduxjs/toolkit";

// Define menuBar interface correctly
interface MenuBarState {
    menuBar: boolean;
}

// Initial state
const initialState: MenuBarState = {
    menuBar: false,
};

// Create a slice for `misc`
const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        openMenuBar(state) {
            state.menuBar = true;
        },
        closeMenuBar(state) {
            state.menuBar = false;
        }
    }
});

// Extract the actions
export const { openMenuBar, closeMenuBar } = miscSlice.actions;

export default miscSlice;
