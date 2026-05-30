import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../../api/axios.js";

import toast from "react-hot-toast";

/* LOGIN */
export const loginUser =
  createAsyncThunk(
    "auth/loginUser",

    async (
      formData,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await api.post(
            "/auth/login",
            formData
          );

        return res.data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      }
    }
  );

/* REGISTER */
export const registerUser =
  createAsyncThunk(
    "auth/registerUser",

    async (
      formData,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await api.post(
            "/auth/register",
            formData
          );

        return res.data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Registration failed"
        );
      }
    }
  );

/* LOGOUT */
export const logoutUser =
  createAsyncThunk(
    "auth/logoutUser",

    async (_, { rejectWithValue }) => {
      try {
        await api.post(
          "/auth/logout"
        );

        return true;
      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Logout failed"
        );
      }
    }
  );

const initialState = {
  user:
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || null,

  loading: false,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (
      state
    ) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN */
      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user ||
            null;

          localStorage.setItem(
            "user",

            JSON.stringify({
              name: action.payload
                .user.name,

              email:
                action.payload
                  .user.email,
            })
          );

          toast.success(
            "Welcome back"
          );
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      /* REGISTER */
      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user ||
            null;

          localStorage.setItem(
            "user",

            JSON.stringify({
              name: action.payload
                .user.name,

              email:
                action.payload
                  .user.email,
            })
          );

          toast.success(
            "Registered successfully"
          );
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      
      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.user = null;

          localStorage.removeItem(
            "user"
          );

          toast.success(
            "Logged out"
          );
        }
      );
  },
});

export const {
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;