import { createSlice } from "@reduxjs/toolkit";
import { fetchInMonth, fetchInYear } from "./operations";
import { addIn } from "./operations";
import { deleteIn } from "./operations";
import { updateIn } from "./operations";
import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "in",
  initialState: {
    items: [],
    yearItems: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchInMonth.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchInMonth.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchInMonth.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchInYear.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchInYear.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchInYear.fulfilled, (state, action) => {
        state.yearItems = action.payload;
        state.loading = false;
      })

      .addCase(addIn.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addIn.fulfilled, (state, action) => {
        const newDayItem = action.payload;
        state.items.push(newDayItem);
        state.dayItems.push(newDayItem);
        state.loading = false;
      })
      .addCase(addIn.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteIn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteIn.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.dayItems = state.dayItems.filter(
          (item) => item._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteIn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateIn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateIn.fulfilled, (state, action) => {
        const updatedWater = action.payload;
        state.items = state.items.map((item) =>
          item._id === updatedWater._id ? updatedWater : item
        );
        state.dayItems = state.dayItems.map((item) =>
          item._id === updatedWater._id ? updatedWater : item
        );
        state.loading = false;
      })
      .addCase(updateIn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export default slice.reducer;
