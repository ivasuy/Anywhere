import axios from "axios";
import { ALL_NOTIFICATIONS_FAIL, ALL_NOTIFICATIONS_REQUEST, ALL_NOTIFICATIONS_SUCCESS } from "../constants/notificationConstants";

export const myNotifications = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_NOTIFICATIONS_REQUEST });


        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/my-notifications`, { withCredentials: true });

        console.log(data.allNotifications);

        dispatch({
            type: ALL_NOTIFICATIONS_SUCCESS,
            payload: data.allNotifications,
        });


    } catch (error) {
        dispatch({
            type: ALL_NOTIFICATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}