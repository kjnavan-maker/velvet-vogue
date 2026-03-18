import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

const initialState = {
  cartItems: getLocalStorage("velvetVogueCart", []),
  shippingFee: 12,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem.product === item.product &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }

      setLocalStorage("velvetVogueCart", state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.cartKey !== action.payload);
      setLocalStorage("velvetVogueCart", state.cartItems);
    },
    updateCartQuantity: (state, action) => {
      const { cartKey, quantity } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.cartKey === cartKey);

      if (item) {
        item.quantity = quantity;
      }

      setLocalStorage("velvetVogueCart", state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      setLocalStorage("velvetVogueCart", state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;