import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axios.defaults.baseURL = "http://localhost:3000/water-app";

//Базовий тип екшену це рядок "contacts/fetchAll"
export const fetchWaterMonth = createAsyncThunk(
  "water/fetchWaterMonth",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.get("water", {
        params: queryParams,
      });
      return response.data.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterDay = createAsyncThunk(
  "water/fetchWaterDay",
  async (queryParams, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.get("water", {
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
  "water/addWater",
  async ({ newAddWater, queryDayParams }, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);

      const response = await axios.post("water/add", newAddWater, {
        params: queryDayParams,
      });
      console.log({ newAddWater, queryDayParams });
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //Базовий тип екшену це рядок "contacts/deleteContact"
export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.delete(`water/${waterId}`, {});
      return response.data._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// // update the existing contact

export const updateWater = createAsyncThunk(
  "water/update",
  async ({ updateWater, queryDayParams }, thunkAPI) => {
    console.log(updateWater, queryDayParams);

    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.accessToken;
      setAuthHeader(savedToken);
      const response = await axios.patch(
        `water/${queryDayParams.id}`,
        updateWater
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
