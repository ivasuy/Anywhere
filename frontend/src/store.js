import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { locationReducer, userLocationReducer } from "./reducers/locationReducer";
import { newPostReducer } from "./reducers/postReducer";
import { newRequestReducer } from "./reducers/requestReducer";
import { allChatReducer } from "./reducers/chatReducer";
import { allNotificationsReducer } from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        location_users: locationReducer,
        user_location: userLocationReducer,
        new_post: newPostReducer,
        new_request: newRequestReducer,
        all_chats: allChatReducer,
        all_notifications: allNotificationsReducer
    },
})

export default store;