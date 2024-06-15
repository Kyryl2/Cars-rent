import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backend = axios.create({
  baseURL: "https://664a1b5fa300e8795d41018b.mockapi.io/",
});

export const fetchCars = createAsyncThunk(
  "cars/fetchLimit",
  async (page, thunkAPI) => {
    try {
      const response = await backend.get("adverts", {
        params: { page: page, limit: 12 },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
