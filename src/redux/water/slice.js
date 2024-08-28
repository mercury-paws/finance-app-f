import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterMonth, fetchWaterDay } from "./operations";
import { addWater } from "./operations";
import { deleteWater } from "./operations";
import { updateWater } from "./operations";
// import { updateContact } from "./operations";
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
        // Ensure action.payload is correctly used
        const newDayItem = action.payload;

        // Update state.items
        state.items.push(newDayItem);

        // // Update state.dayItems
        // const existingDayItemIndex = state.dayItems.findIndex(
        //   (item) =>
        //     item.day === newDayItem.day &&
        //     item.month === newDayItem.month &&
        //     item.year === newDayItem.year
        // );

        // if (existingDayItemIndex !== -1) {
        //   // Update existing day item
        //   state.dayItems[existingDayItemIndex] = newDayItem;
        // } else {
        // Add new day item
        state.dayItems.push(newDayItem);
        // }

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
        console.log("Payload:", action.payload);
        const updatedWater = action.payload;
        state.items = state.items.map((item) =>
          item._id === updatedWater._id ? updatedWater : item
        );
        state.dayItems = state.dayItems.map((item) =>
          item._id === updatedWater._id ? updatedWater : item
        );
        state.loading = false;
      }),
  //   .addCase(updateContact.rejected, (state) => {
  //     state.loading.update = false;
  //     state.error = true;
  //   }),
});

export default slice.reducer;
