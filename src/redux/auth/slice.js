import { createSlice } from "@reduxjs/toolkit";
import {
  logIn,
  register,
  logOut,
  refreshUser,
  updateUser,
  findPhotos,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: false,
    photos: [],
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = true;
      })
      .addCase(logIn.pending, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        // state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        console.log("action.payload", action.payload);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(state.user);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(findPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
      }),
});

export default authSlice.reducer;
