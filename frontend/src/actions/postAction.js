import axios from "axios";
import { CLEAR_ERRORS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_RESET, MYFEED_POSTS_REQUEST, MYFEED_POSTS_SUCCESS, MYFEED_POSTS_FAIL } from "../constants/postConstants"


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

export const fetchMyFeedPosts = () => async (dispatch) => {
    try {
        dispatch({ type: MYFEED_POSTS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/myfeed/posts`, { withCredentials: true });

        dispatch({
            type: MYFEED_POSTS_SUCCESS,
            payload: data.posts,
        });


    } catch (error) {
        dispatch({
            type: MYFEED_POSTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};