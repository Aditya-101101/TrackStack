import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.js";

export const fetchMonitorStats = createAsyncThunk(
  "stats/fetchMonitorStats",
  async (monitorId, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `/monitors/${monitorId}/stats`
      );

      return response.data.stats;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stats"
      );
    }
  }
);

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitorStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMonitorStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(fetchMonitorStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;