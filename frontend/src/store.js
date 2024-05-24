import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { locationReducer, userLocationReducer } from "./reducers/locationReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        location_users: locationReducer,
        user_location: userLocationReducer,
    },
})

export default store;