import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { locationReducer, userLocationReducer } from "./reducers/locationReducer";
import { myfeedPostsReducer, newPostReducer } from "./reducers/postReducer";
import { allChumsReducer } from "./reducers/requestReducer";
import { allChatReducer } from "./reducers/chatReducer";
import { allNotificationsReducer } from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        location_users: locationReducer,
        user_location: userLocationReducer,
        new_post: newPostReducer,
        all_chats: allChatReducer,
        all_notifications: allNotificationsReducer,
        all_chums: allChumsReducer,
        myfeed_posts: myfeedPostsReducer
    },
})

export default store;