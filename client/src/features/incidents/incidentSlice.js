import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.js";

export const fetchIncidents = createAsyncThunk(
    "incidents/fetchIncidents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/incidents");

            return response.data.incidents;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch incidents"
            );
        }
    }
);

export const fetchMonitorIncidents = createAsyncThunk(
    "incidents/fetchMonitorIncidents",
    async (monitorId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/monitors/${monitorId}/incidents`
            );

            return response.data.incidents;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch monitor incidents"
            );
        }
    }
);

export const fetchOpenIncidents = createAsyncThunk(
    "incidents/fetchOpenIncidents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                "/incidents/open"
            );

            return response.data.incidents;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch open incidents"
            );
        }
    }
);

const initialState = {
    incidents: [],
    monitorIncidents: [],
    OpenIncidents: [],
    loading: false,
    error: null,
};

const incidentSlice = createSlice({
    name: "incidents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncidents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchIncidents.fulfilled, (state, action) => {
                state.loading = false;
                state.incidents = action.payload;
            })

            .addCase(fetchIncidents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMonitorIncidents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchMonitorIncidents.fulfilled, (state, action) => {
                state.loading = false;
                state.monitorIncidents = action.payload;
            })

            .addCase(fetchMonitorIncidents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOpenIncidents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchOpenIncidents.fulfilled, (state, action) => {
                state.loading = false;
                state.openIncidents = action.payload;
            })

            .addCase(fetchOpenIncidents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default incidentSlice.reducer;