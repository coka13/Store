import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItem: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        const newItem={...action.payload}
        newItem.quantity=1
        state.cart=[...state.cart,newItem]
      }
    },
    removeItem: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity -= 1;
        if (state.cart[existingItemIndex].quantity === 0) {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const { setItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
