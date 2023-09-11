import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";
import authLoginSlices from "./slices/authLogin";

const store = configureStore({
    reducer: {
        users: userSlices,
        auth: authLoginSlices
    },
});

export default store;