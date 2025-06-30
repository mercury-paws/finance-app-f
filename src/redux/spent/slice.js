import { createSlice } from "@reduxjs/toolkit";
import { fetchSpentMonth, fetchSpentDay, fetchSpentYear } from "./operations";
import { addSpent } from "./operations";
import { deleteSpent } from "./operations";
import { updateWater } from "./operations";
import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "spent",
  initialState: {
    items: [],
    dayItems: [],
    yearItems: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSpentMonth.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchSpentMonth.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpentMonth.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSpentYear.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSpentYear.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchSpentYear.fulfilled, (state, action) => {
        state.yearItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpentDay.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchSpentDay.fulfilled, (state, action) => {
        state.dayItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpentDay.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(addSpent.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addSpent.fulfilled, (state, action) => {
        const newDayItem = action.payload;
        state.items.push(newDayItem);
        state.dayItems.push(newDayItem);
        state.loading = false;
      })
      .addCase(addSpent.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteSpent.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteSpent.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.dayItems = state.dayItems.filter(
          (item) => item._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteSpent.rejected, (state) => {
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
