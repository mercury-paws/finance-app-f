import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterMonth, fetchWaterDay } from "./operations";
import { addWater } from "./operations";
import { deleteWater } from "./operations";
import { updateWater } from "./operations";
import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "water",
  initialState: {
    items: [],
    dayItems: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchWaterMonth.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchWaterMonth.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWaterMonth.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchWaterDay.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchWaterDay.fulfilled, (state, action) => {
        state.dayItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchWaterDay.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(addWater.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        const newDayItem = action.payload;
        state.items.push(newDayItem);
        state.dayItems.push(newDayItem);
        state.loading = false;
      })
      .addCase(addWater.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.dayItems = state.dayItems.filter(
          (item) => item._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        const updatedWater = action.payload;
        state.items = state.items.map((item) =>
          item._id === updatedWater._id ? updatedWater : item
        );
        state.dayItems = state.dayItems.map((item) =>
          item._id === updatedWater._id ? updatedWater : item
        );
        state.loading = false;
      })
      .addCase(updateWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export default slice.reducer;
