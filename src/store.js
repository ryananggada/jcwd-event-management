import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";

const store = configureStore({
    reducer: {
        users: userSlices,
    },
});

export default store;