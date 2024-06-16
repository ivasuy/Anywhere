import { CLEAR_ERRORS, FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, LOCATE_USER_FAIL, LOCATE_USER_REQUEST, LOCATE_USER_SUCCESS } from "../constants/locationConstants";
import axios from "axios";

export const fetchUsers = (longitude, latitude, maxDistance) => async (dispatch) => {

    try {
        dispatch({ type: FETCH_USERS_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };


        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users-list`, { longitude, latitude, maxDistance }, config);

        dispatch({ type: FETCH_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAIL, payload: error.response.data.message });
    }
};

export const update_user_location = (longitude, latitude) => async (dispatch) => {
    try {
        dispatch({ type: LOCATE_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user-location`, { longitude, latitude }, config);
        console.log(data)

        dispatch({ type: LOCATE_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOCATE_USER_FAIL, payload: error.response.data.message });
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};