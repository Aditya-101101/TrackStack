import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

const initialState = {
    monitors: [],
    selectedMonitor: null,
    loading: false,
    error: null,
}

export const fetchMonitors = createAsyncThunk(
    "monitors/fetchMonitors",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/monitors')

            return res.data.monitors || res.data.data || res.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            )
        }
    }
)

const monitorSlice = createSlice({
    name: "monitors",
    initialState,
    reducers: {
        clearMonitorError: (state) => {
            state.error = null;
        },
        clearSelectedMonitor: (state) => {
            state.selectedMonitor = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonitors.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMonitors.fulfilled, (state, action) => {
                state.loading = false;
                state.monitors = action.payload;
            })
            .addCase(fetchMonitors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearMonitorError, clearSelectedMonitor } = monitorSlice.actions;

export default monitorSlice.reducer;