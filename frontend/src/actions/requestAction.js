import axios from "axios";
import { CLEAR_ERRORS, NEW_CHUM_REQUEST_FAIL, NEW_CHUM_REQUEST_REQUEST, NEW_CHUM_REQUEST_SUCCESS, NEW_CHUM_REQUEST_RESET } from "../constants/postConstants"


export const createNewChumRequest = (userId) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CHUM_REQUEST_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/new-post`, postData, config);

        dispatch({
            type: NEW_CHUM_REQUEST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: NEW_CHUM_REQUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};