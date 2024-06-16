import axios from "axios";
import { CLEAR_ERRORS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_RESET } from "../constants/postConstants"


export const createNewPost = (postData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_POST_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/new-post`, postData, config);

        dispatch({
            type: NEW_POST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: NEW_POST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};