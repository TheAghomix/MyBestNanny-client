import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

import orderReducer from "./orderReducer";
import editProfileReducer from "./editProfileReducer";
import searchReducer from "./searchReducer";

const store = configureStore({
    reducer: { authR: authReducer, editProfileReducer, orderReducer, searchReducer }, middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export default store;
