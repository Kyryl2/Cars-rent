import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCars } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "cars",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCars.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = payload;
      })

      .addCase(fetchAllCars.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});

export const carsReducer = slice.reducer;
