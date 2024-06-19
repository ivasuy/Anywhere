import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { locationReducer, userLocationReducer } from "./reducers/locationReducer";
import { newPostReducer } from "./reducers/postReducer";
import { newRequestReducer } from "./reducers/requestReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        location_users: locationReducer,
        user_location: userLocationReducer,
        new_post: newPostReducer,
        new_request: newRequestReducer,
    },
})

export default store;