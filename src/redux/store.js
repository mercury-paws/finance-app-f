import { configureStore } from "@reduxjs/toolkit";
import waterReducer from "./water/slice.js";

export const store = configureStore({
  reducer: {
    water: waterReducer,

    // auth: persistedAuthReducer,
  },
});
