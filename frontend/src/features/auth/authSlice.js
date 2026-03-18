import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUserRequest,
  getProfileRequest,
  loginUserRequest,
  registerUserRequest,
  updateProfileRequest,
} from "../../services/authService";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../utils/localStorage";

const initialState = {
  authData: getLocalStorage("velvetVogueAuth", null),
  profile: null,
  loading: false,
  error: null,
};

const extractError = (error) => error.response?.data?.message || error.message || "Something went wrong";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload, thunkAPI) => {
  try {
    return await loginUserRequest(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (payload, thunkAPI) => {
  try {
    return await registerUserRequest(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, thunkAPI) => {
  try {
    return await getProfileRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (payload, thunkAPI) => {
  try {
    return await updateProfileRequest(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const hydrateCurrentUser = createAsyncThunk("auth/hydrateCurrentUser", async (_, thunkAPI) => {
  try {
    return await getCurrentUserRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.authData = null;
      state.profile = null;
      state.loading = false;
      state.error = null;
      removeLocalStorage("velvetVogueAuth");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.profile = action.payload.user;
        setLocalStorage("velvetVogueAuth", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.profile = action.payload.user;
        setLocalStorage("velvetVogueAuth", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.authData = {
          ...state.authData,
          user: action.payload.user,
        };
        setLocalStorage("velvetVogueAuth", state.authData);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(hydrateCurrentUser.fulfilled, (state, action) => {
        if (state.authData) {
          state.authData = {
            ...state.authData,
            user: action.payload,
          };
          state.profile = action.payload;
          setLocalStorage("velvetVogueAuth", state.authData);
        }
      })
      .addCase(hydrateCurrentUser.rejected, (state) => {
        state.authData = null;
        state.profile = null;
        removeLocalStorage("velvetVogueAuth");
      });
  },
});

export const { logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;