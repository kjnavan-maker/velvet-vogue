import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderRequest,
  getAdminDashboardRequest,
  getAdminOrdersRequest,
  getMyOrdersRequest,
  getOrderRequest,
  updateOrderStatusRequest,
} from "../../services/orderService";

const extractError = (error) => error.response?.data?.message || error.message || "Something went wrong";

const initialState = {
  currentOrder: null,
  myOrders: [],
  adminOrders: [],
  dashboard: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk("orders/createOrder", async (payload, thunkAPI) => {
  try {
    return await createOrderRequest(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchMyOrders = createAsyncThunk("orders/fetchMyOrders", async (_, thunkAPI) => {
  try {
    return await getMyOrdersRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (id, thunkAPI) => {
  try {
    return await getOrderRequest(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchAdminDashboard = createAsyncThunk("orders/fetchAdminDashboard", async (_, thunkAPI) => {
  try {
    return await getAdminDashboardRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchAdminOrders = createAsyncThunk("orders/fetchAdminOrders", async (_, thunkAPI) => {
  try {
    return await getAdminOrdersRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ id, payload }, thunkAPI) => {
    try {
      return await updateOrderStatusRequest(id, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = state.adminOrders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;