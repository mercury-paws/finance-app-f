import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://water-app-b.onrender.com/";
// axios.defaults.baseURL = "http://localhost:3000/water-app";
axios.defaults.withCredentials = true;

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(
    "Authorization header set to:",
    axios.defaults.headers.common["Authorization"]
  );
};
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

// POST - register @ /auth/register

export const findPhotos = createAsyncThunk(
  "auth/photos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/auth/photos");
      return response.data.data.photos;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser);
      setAuthHeader(response.data.data.accessToken);
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// POST - login @ /auth/login

export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userInfo);
      setAuthHeader(response.data.data.accessToken);
      console.log(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// POST - logout @ /auth/logout

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");

    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

// GET - refresh @ /auth/refresh

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post("/auth/refresh");
      setAuthHeader(response.data.data.accessToken);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      return savedToken !== null;
    },
  }
);

// update contact /settings

export const updateUser = createAsyncThunk(
  "auth/settings",
  async ({ email, formattedValues }, thunkAPI) => {
    console.log("values", formattedValues);
    try {
      const response = await axios.patch("/auth/settings", formattedValues, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { email },
      });
      // setAuthHeader(response.data.data.accessToken);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
