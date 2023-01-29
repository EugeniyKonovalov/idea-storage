import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import foldersSlice from "./folder/folders.slice";

const store = configureStore({
  reducer: { auth: authSlice, folders: foldersSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
