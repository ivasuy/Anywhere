import { createReducer } from "@reduxjs/toolkit";
import { ALL_CHAT_FAIL, ALL_CHAT_REQUEST, ALL_CHAT_RESET, ALL_CHAT_SUCCESS, CLEAR_ERRORS } from "../constants/chatConstants";


export const allChatReducer = createReducer({ fetchedChats: [] }, (builder) => {
    builder
        .addCase(ALL_CHAT_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(ALL_CHAT_SUCCESS, (state, action) => {
            state.loading = false;
            state.success = true;
            state.fetchedChats = action.payload;
        })
        .addCase(ALL_CHAT_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(ALL_CHAT_RESET, (state) => {
            state.success = false;
            state.error = null
        })
        .addCase(CLEAR_ERRORS, (state) => {
            state.error = null;
        });
});
