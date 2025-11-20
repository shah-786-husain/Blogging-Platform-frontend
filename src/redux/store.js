import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./AuthSlice";

// Correct key name
const persistConfig = {
  key: "root",
  storage,
};

//  Wrap reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Correct store setup
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // avoid non-serializable warning
    }),
});

// Correct export name
export const persistor = persistStore(store);
