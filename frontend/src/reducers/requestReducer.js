import { createReducer } from "@reduxjs/toolkit";
import {
    NEW_CHUM_REQUEST_FAIL,
    NEW_CHUM_REQUEST_REQUEST,
    NEW_CHUM_REQUEST_RESET,
    NEW_CHUM_REQUEST_SUCCESS,
    CLEAR_ERRORS
} from "../constants/requestConstants";

export const newRequestReducer = createReducer({ request: {} }, (builder) => {
    builder
        .addCase(NEW_CHUM_REQUEST_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(NEW_CHUM_REQUEST_SUCCESS, (state, action) => {
            state.loading = false;
            state.success = true;
            state.request = action.payload.newRequest;
        })
        .addCase(NEW_CHUM_REQUEST_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(NEW_CHUM_REQUEST_RESET, (state) => {
            state.success = false;
            state.error = null
        })
        .addCase(CLEAR_ERRORS, (state) => {
            state.error = null;
        });
});
