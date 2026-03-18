import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductRequest,
  deleteProductRequest,
  getCategoriesRequest,
  getProductRequest,
  getProductsRequest,
  updateProductRequest,
} from "../../services/productService";

const extractError = (error) => error.response?.data?.message || error.message || "Something went wrong";

const initialState = {
  products: [],
  product: null,
  relatedProducts: [],
  categories: [],
  filters: {
    categories: [],
    clothingTypes: [],
    colors: [],
    sizes: [],
  },
  page: 1,
  pages: 1,
  totalProducts: 0,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (params, thunkAPI) => {
  try {
    return await getProductsRequest(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id, thunkAPI) => {
  try {
    return await getProductRequest(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const fetchCategories = createAsyncThunk("products/fetchCategories", async (_, thunkAPI) => {
  try {
    return await getCategoriesRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const createProduct = createAsyncThunk("products/createProduct", async (payload, thunkAPI) => {
  try {
    return await createProductRequest(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, payload }, thunkAPI) => {
    try {
      return await updateProductRequest(id, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, thunkAPI) => {
  try {
    await deleteProductRequest(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearSingleProduct: (state) => {
      state.product = null;
      state.relatedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.filters = action.payload.filters;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.relatedProducts = action.payload.relatedProducts;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError, clearSingleProduct } = productSlice.actions;
export default productSlice.reducer;