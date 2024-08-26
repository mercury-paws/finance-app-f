import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseUrl = "http://localhost:3000/water-app";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };
// const clearAuthHeader = () => {
//   axios.defaults.headers.common["Authorization"] = "";
// };

// POST - register @ /users/signup
//* johndow@mail.com, johndow1@mail.com

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser);
      // setAuthHeader(response.data.token);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST - login @ /users/login

export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userInfo);
      // setAuthHeader(response.data.data.accessToken);
      // console.log(response.data.data.accessToken);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST - logout @ /users/logout

// export const logOut = createAsyncThunk("/logout", async (_, thunkAPI) => {
//   try {
//     await axios.post("/users/logout");
//     clearAuthHeader();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// GET - refresh @ /users/current

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const reduxState = thunkAPI.getState();
//     const savedToken = reduxState.auth.token;
//     setAuthHeader(savedToken);
//     const response = await axios.get("users/current");
//     return response.data;
//   },
//   {
//     condition(_, thunkAPI) {
//       const reduxState = thunkAPI.getState();
//       const savedToken = reduxState.auth.token;
//       return savedToken !== null;
//     },
//   }
// );
