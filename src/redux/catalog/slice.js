import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  favorites: [],
};

const slice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCars(state, { payload }) {
      if (
        Array.isArray(payload) &&
        !state.favorites.some((item) => item.id === payload.id)
      ) {
        state.favorites = [...state.favorites, ...payload];
      } else {
        state.favorites.push(payload);
      }
    },
    deleteCars(state, { payload }) {
      state.favorites = state.favorites.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (Array.isArray(payload)) {
          state.items = [...state.items, ...payload];
        } else {
          state.items.push(payload);
        }
      })

      .addCase(fetchCars.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});
export const { addCars, deleteCars } = slice.actions;
export const carsReducer = slice.reducer;
