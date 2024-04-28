import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    CLEAR_ERRORS,
} from "../constants/userConstants";

import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({ user: {} }, builder => {
    builder
        .addCase(LOGIN_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase(REGISTER_USER_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase(LOAD_USER_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase(LOGIN_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(REGISTER_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(LOAD_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(LOGIN_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(REGISTER_USER_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(LOAD_USER_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(LOGOUT_SUCCESS, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(LOGOUT_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});