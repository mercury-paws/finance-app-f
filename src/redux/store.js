import { configureStore } from "@reduxjs/toolkit";
import waterReducer from "./water/slice.js";
import authReducer from "./auth/slice.js";

export const store = configureStore({
  reducer: {
    water: waterReducer,
    auth: authReducer,
    // auth: persistedAuthReducer,
  },
});
