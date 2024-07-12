import { createReducer } from "@reduxjs/toolkit";
import {
    // NEW_CHUM_REQUEST_FAIL,
    // NEW_CHUM_REQUEST_REQUEST,
    // NEW_CHUM_REQUEST_RESET,
    // NEW_CHUM_REQUEST_SUCCESS,
    CLEAR_ERRORS,
    FETCH_CHUMS_REQUEST,
    FETCH_CHUMS_SUCCESS,
    FETCH_CHUMS_FAIL,
} from "../constants/requestConstants";

// export const newRequestReducer = createReducer({ request: {} }, (builder) => {
//     builder
//         .addCase(NEW_CHUM_REQUEST_REQUEST, (state) => {
//             state.loading = true;
//         })
//         .addCase(NEW_CHUM_REQUEST_SUCCESS, (state, action) => {
//             state.loading = false;
//             state.success = true;
//             state.request = action.payload.newRequest;
//         })
//         .addCase(NEW_CHUM_REQUEST_FAIL, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         })
//         .addCase(NEW_CHUM_REQUEST_RESET, (state) => {
//             state.success = false;
//             state.error = null
//         })
//         .addCase(CLEAR_ERRORS, (state) => {
//             state.error = null;
//         });
// });


export const allChumsReducer = createReducer({ chums: [] }, builder => {
    builder
        .addCase(FETCH_CHUMS_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })

        .addCase(FETCH_CHUMS_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.chums = action.payload;
        })

        .addCase(FETCH_CHUMS_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.chums = null;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});