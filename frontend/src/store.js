import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { locationReducer, userLocationReducer } from "./reducers/locationReducer";
import { newPostReducer } from "./reducers/postReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        location_users: locationReducer,
        user_location: userLocationReducer,
        new_post: newPostReducer
    },
})

export default store;