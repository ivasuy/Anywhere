import { CLEAR_ERRORS, FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, LOCATE_USER_FAIL, LOCATE_USER_REQUEST, LOCATE_USER_SUCCESS } from "../constants/locationConstants";

import { createReducer } from "@reduxjs/toolkit";

export const locationReducer = createReducer({ users: [] }, builder => {
    builder
        .addCase(FETCH_USERS_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })

        .addCase(FETCH_USERS_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.users = action.payload;
        })

        .addCase(FETCH_USERS_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.users = null;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});

export const userLocationReducer = createReducer({ user: {} }, builder => {
    builder
        .addCase(LOCATE_USER_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })

        .addCase(LOCATE_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })

        .addCase(LOCATE_USER_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});