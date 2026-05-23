import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.js";

export const fetchMonitorResults = createAsyncThunk(
  "results/fetchMonitorResults",
  async (monitorId, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `/monitors/${monitorId}/results`
      );

      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch results"
      );
    }
  }
);

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitorResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMonitorResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })

      .addCase(fetchMonitorResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resultSlice.reducer;