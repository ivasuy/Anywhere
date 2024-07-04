import { createReducer } from "@reduxjs/toolkit";

import { ALL_NOTIFICATIONS_FAIL, ALL_NOTIFICATIONS_REQUEST, ALL_NOTIFICATIONS_RESET, ALL_NOTIFICATIONS_SUCCESS, CLEAR_ERRORS } from "../constants/notificationConstants";


export const allNotificationsReducer = createReducer({ allNotifications: [] }, (builder) => {
    builder
        .addCase(ALL_NOTIFICATIONS_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(ALL_NOTIFICATIONS_SUCCESS, (state, action) => {
            state.loading = false;
            state.success = true;
            state.allNotifications = action.payload;
        })
        .addCase(ALL_NOTIFICATIONS_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(ALL_NOTIFICATIONS_RESET, (state) => {
            state.success = false;
            state.error = null
        })
        .addCase(CLEAR_ERRORS, (state) => {
            state.error = null;
        });
});
