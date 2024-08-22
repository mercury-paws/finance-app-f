import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

axios.defaults.baseURL = "http://localhost:3000/water-app";

//Базовий тип екшену це рядок "contacts/fetchAll"
export const fetchWaterMonth = createAsyncThunk(
  "water/fetchWaterMonth",
  async (queryParams, thunkAPI) => {
    try {
      //   const reduxState = thunkAPI.getState();
      //   const savedToken = reduxState.auth.token;
      //   setAuthHeader(savedToken);

      const response = await axios.get("water", {
        params: queryParams,
        headers: {
          Authorization: `Bearer hqHeEanPzcwgMYPCuGKOWREG20BVxeEapg0svYBD`,
        },
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
      //   const reduxState = thunkAPI.getState();
      //   const savedToken = reduxState.auth.token;
      //   setAuthHeader(savedToken);

      const response = await axios.get("water", {
        params: queryParams,
        headers: {
          Authorization: `Bearer hqHeEanPzcwgMYPCuGKOWREG20BVxeEapg0svYBD`,
        },
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
      const response = await axios.post("water/add", newAddWater, {
        params: queryDayParams,
        headers: {
          Authorization: `Bearer hqHeEanPzcwgMYPCuGKOWREG20BVxeEapg0svYBD`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //Базовий тип екшену це рядок "contacts/deleteContact"
// export const deleteWater = createAsyncThunk(
//   "water/deleteWater",
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`water/${contactId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // update the existing contact

// export const updateWater = createAsyncThunk(
//   "water/update",
//   async (contact, thunkAPI) => {
//     try {
//       const reduxState = thunkAPI.getState();
//       const savedToken = reduxState.auth.token;
//       setAuthHeader(savedToken);
//       const response = await axios.patch(`water/${contact.id}`, {
//         name: contact.name,
//         number: contact.number,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
