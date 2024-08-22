import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterMonth, fetchWaterDay } from "./operations";
import { addWater } from "./operations";
// import { deleteContact } from "./operations";
// import { updateContact } from "./operations";
// import { logOut } from "../auth/operations";

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
        state.dayItems.push(action.payload);
        state.loading = false;
      })
      .addCase(addWater.rejected, (state) => {
        state.error = true;
        state.loading = false;
      }),
  //   .addCase(deleteContact.pending, (state) => {
  //     state.loading.delete = true;
  //     state.error = false;
  //   })
  //   .addCase(deleteContact.fulfilled, (state, action) => {
  //     state.items = state.items.filter(
  //       (item) => item.id !== action.payload.id
  //     );
  //     state.loading.delete = false;
  //   })
  //   .addCase(deleteContact.rejected, (state) => {
  //     state.loading.delete = false;
  //     state.error = true;
  //   })
  //   .addCase(logOut.fulfilled, (state) => {
  //     state.items = [];
  //     state.loading.add = false;
  //     state.loading.fetch = false;
  //     state.loading.delete = false;
  //   })
  //   .addCase(updateContact.pending, (state) => {
  //     state.loading.update = true;
  //     state.error = false;
  //   })
  //   .addCase(updateContact.fulfilled, (state, action) => {
  //     console.log("Payload:", action.payload);
  //     const updatedContact = action.payload;
  //     state.items = state.items.map((item) =>
  //       item.id === updatedContact.id ? updatedContact : item
  //     );
  //     state.loading.update = false;
  //   })
  //   .addCase(updateContact.rejected, (state) => {
  //     state.loading.update = false;
  //     state.error = true;
  //   }),
});

export default slice.reducer;
