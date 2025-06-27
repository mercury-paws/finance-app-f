import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "https://water-app-b.onrender.com/";
// axios.defaults.withCredentials = true;

//Базовий тип екшену це рядок "contacts/fetchAll"
export const fetchWaterMonth = createAsyncThunk(
  "spent/fetchWaterMonth",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.get("spent", {
        params: queryParams,
      });
      return response.data.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSpentYear = createAsyncThunk(
  "spent/fetchSpentYear",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.get("spent", {
        params: queryParams,
      });
      return response.data.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterDay = createAsyncThunk(
  "spent/fetchWaterDay",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.get("spent", {
        params: queryParams,
      });
      return response.data.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Базовий тип екшену це рядок "contacts/addContact"
export const addWater = createAsyncThunk(
  "spent/addWater",
  async ({ newAddWater, queryDayParams }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.post("spent/add", newAddWater, {
        params: queryDayParams,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //Базовий тип екшену це рядок "contacts/deleteContact"
export const deleteSpent = createAsyncThunk(
  "spent/deleteSpent",
  async (waterId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.delete(`spent/${waterId}`, {});
      return response.data._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// // update the existing contact

export const updateWater = createAsyncThunk(
  "spent/update",
  async ({ updateWater, queryDayParams }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.patch(
        `spent/${queryDayParams.id}`,
        updateWater
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
