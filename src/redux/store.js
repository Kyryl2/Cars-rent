import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },

  devTools: import.meta.env.MODE !== "production", // true
});
