import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ideaStorageApi } from "./api_queries/api_idea_storage";

import authSlice from "./auth/auth.slice";
import foldersSlice from "./folder/folders.slice";
import notesSlice from "./notes/notes.slice";

const authPersistConfig = {
  key: "auth",
  storage,

  whitelist: ["token", "isLoggedIn"],
};
const foldersPersistConfig = {
  key: "folders",
  storage,
};
const notesPersistConfig = {
  key: "notes",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  folders: persistReducer(foldersPersistConfig, foldersSlice),
  notes: persistReducer(notesPersistConfig, notesSlice),
  [ideaStorageApi.reducerPath]: ideaStorageApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ideaStorageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
