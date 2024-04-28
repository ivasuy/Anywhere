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

    CLEAR_ERRORS
} from "../constants/userConstants";

import axios from "axios";

// Login user
export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, { username, password }, config);
        // console.log(data)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`, { withCredentials: true });
        // await axios.get(`${BackendUrl}${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS });


    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me`, { withCredentials: true });

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};