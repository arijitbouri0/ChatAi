import { configureStore } from "@reduxjs/toolkit";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";
import { chatApi } from "./api/api";

const store=configureStore({
    reducer:{
        misc:miscSlice.reducer,
        chat:chatSlice.reducer,
        [chatApi.reducerPath]:chatApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>;