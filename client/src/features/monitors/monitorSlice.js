import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

const initialState = {
    monitors: [],
    selectedMonitor: null,
    loading: false,
    checking: false,
    checkMessage: null,
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

export const toggleMonitorActive = createAsyncThunk(
    "monitors/toggleMonitorActive",
    async ({ id, isActive }, { rejectWithValue }) => {
        try {
            let response
            if (!isActive)
                response = await api.post(`/monitors/${id}/pause`);
            else
                response = await api.post(`/monitors/${id}/resume`);

            //   console.log("TOGGLE MONITOR RESPONSE:", response.data);

            return (
                response.data.monitor ||
                response.data.data?.monitor ||
                response.data.data ||
                response.data
            );
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update monitor"
            );
        }
    }
);

export const deleteMonitor = createAsyncThunk(
    "monitors/deleteMonitor",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/monitors/${id}`);

            //   console.log("DELETE MONITOR RESPONSE:", response.data);

            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete monitor"
            );
        }
    }
);

export const createMonitor = createAsyncThunk(
    "monitors/createMonitor",
    async (monitorData, { rejectWithValue }) => {
        try {
            const response = await api.post('/monitors', monitorData)

            return response.data.monitor || response.data.data || response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create monitor"
            )
        }
    }
)

export const fetchMonitorById = createAsyncThunk(
    "monitors/fetchMonitorById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/monitors/${id}`);

            //   console.log("SINGLE MONITOR RESPONSE:", response.data);

            return response.data.monitor || response.data.data || response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch monitor"
            );
        }
    }
);

export const manualCheckMonitor = createAsyncThunk(
    "monitors/manualCheckMonitor",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.post(`/monitors/${id}/check`);

            //   console.log("MANUAL CHECK RESPONSE:", response.data);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to run manual check"
            );
        }
    }
);

export const updateMonitor = createAsyncThunk(
    "monitors/updateMonitor",
    async ({ id, monitorData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/monitors/${id}`, monitorData);

            console.log("UPDATE MONITOR RESPONSE:", response.data);

            return (
                response.data.monitor ||
                response.data.updatedMonitor ||
                response.data.data?.monitor ||
                response.data.data ||
                response.data
            );
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update monitor"
            );
        }
    }
);


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
        clearCheckMessage: (state) => {
            state.checkMessage = null;
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
            })
            .addCase(createMonitor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMonitor.fulfilled, (state, action) => {
                state.loading = false;
                state.monitors.unshift(action.payload);
            })
            .addCase(createMonitor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMonitorById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMonitorById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMonitor = action.payload;
            })
            .addCase(fetchMonitorById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(manualCheckMonitor.pending, (state) => {
                state.checking = true;
                state.error = null;
                state.checkMessage = null;
            })
            .addCase(manualCheckMonitor.fulfilled, (state, action) => {
                state.checking = false;
                state.checkMessage = action.payload.message || "Manual check queued";
            })
            .addCase(manualCheckMonitor.rejected, (state, action) => {
                state.checking = false;
                state.error = action.payload;
            })
            .addCase(toggleMonitorActive.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleMonitorActive.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMonitor = action.payload;

                const index = state.monitors.findIndex(
                    (monitor) => monitor._id === action.payload._id
                );

                if (index !== -1) {
                    state.monitors[index] = action.payload;
                }
            })
            .addCase(toggleMonitorActive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMonitor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMonitor.fulfilled, (state, action) => {
                state.loading = false;

                state.monitors = state.monitors.filter(
                    (monitor) => monitor._id !== action.payload
                );

                state.selectedMonitor = null;
            })
            .addCase(deleteMonitor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateMonitor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMonitor.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMonitor = action.payload;

                const index = state.monitors.findIndex(
                    (monitor) => monitor._id === action.payload._id
                );

                if (index !== -1) {
                    state.monitors[index] = action.payload;
                }
            })
            .addCase(updateMonitor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const { clearMonitorError, clearSelectedMonitor, clearCheckMessage } = monitorSlice.actions;

export default monitorSlice.reducer;