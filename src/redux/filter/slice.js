import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "../catalog/operations";

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
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = [...state.items, ...payload];
      })

      .addCase(fetchCars.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});

export const carsReducer = slice.reducer;
