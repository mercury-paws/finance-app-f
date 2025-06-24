import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "https://water-app-b.onrender.com/";
// axios.defaults.withCredentials = true;

//Базовий тип екшену це рядок "contacts/fetchAll"
export const fetchInMonth = createAsyncThunk(
  "in/fetchInMonth",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.get("in", {
        params: queryParams,
      });
      return response.data.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchInYear = createAsyncThunk(
  "in/fetchInYear",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.get("in", {
        params: queryParams,
      });
      return response.data.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Базовий тип екшену це рядок "contacts/addContact"
export const addIn = createAsyncThunk(
  "in/addIn",
  async ({ newAddIn, queryDayParams }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.post("in/add", newAddIn, {
        params: queryDayParams,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //Базовий тип екшену це рядок "contacts/deleteContact"
export const deleteIn = createAsyncThunk(
  "in/deleteIn",
  async (inId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.delete(`in/${inId}`, {});
      return response.data._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// // update the existing contact

export const updateIn = createAsyncThunk(
  "in/update",
  async ({ updateIn, queryDayParams }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.patch(`in/${queryDayParams.id}`, updateIn);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
