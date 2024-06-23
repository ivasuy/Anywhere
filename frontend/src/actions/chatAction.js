import axios from "axios";
import { ALL_CHAT_FAIL, ALL_CHAT_REQUEST, ALL_CHAT_SUCCESS, CLEAR_ERRORS } from "../constants/chatConstants";

export const getChats = (activeChatType) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CHAT_REQUEST });

        let data;
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        if (activeChatType === 'myChats') {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/chats/single`, config);
            data = response.data;
        } else if (activeChatType === 'groups') {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/chats/groups`, config);
            data = response.data;

        }

        dispatch({
            type: ALL_CHAT_SUCCESS,
            payload: data.chats,  // Make sure the correct key is used here
        });

    } catch (error) {
        dispatch({
            type: ALL_CHAT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
