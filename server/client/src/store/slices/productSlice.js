import { createSlice } from "@reduxjs/toolkit";
import { sorting } from "../../utils/sortByParameter";

const initialState = {
  products: [],
  filteredProducts: [],
  chosenProduct: {},
  categories: [],
  chosenCategory: "All Products",
  sorting: [],
  chosenSorting: "A-Z",
  priceRange: [0, 0],
  maxPrice: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      // Find the most expensive product
      const maxPriceProduct = action.payload.reduce((prev, current) => {
        return prev.price > current.price ? prev : current;
      });
      state.maxPrice = maxPriceProduct.price;

      // Add quantity property to each product and set initial value to 0
      const newProductsWithQuantity = action.payload.map((product) => ({
        ...product,
        quantity: 0,
      }));

      // Update products and filteredProducts state with sorted product list
      state.products = newProductsWithQuantity;
      state.filteredProducts = sorting(
        newProductsWithQuantity,
        state.chosenSorting
      );
    },
    setChosenProduct: (state, action) => {
      // Update chosenProduct state
      state.chosenProduct = action.payload;
    },
    setAllCategories: (state, action) => {
      // Update categories state
      state.categories = action.payload;
    },
    setChosenCategory: (state, action) => {
      // Update chosenCategory state and filter products accordingly
      state.chosenCategory = action.payload;
      if (action.payload === "All Products") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category === action.payload
        );
      }
    },
    setAllSort: (state, action) => {
      // Update sorting state
      state.sorting = action.payload;
    },
    setChosenSort: (state, action) => {
      // Update chosenSorting state and sort filteredProducts accordingly
      state.chosenSorting = action.payload;
      state.filteredProducts = sorting(state.filteredProducts, action.payload);
    },
    setPriceRange: (state, action) => {
      // Update priceRange state
      state.priceRange = action.payload;

      // Filter products based on price range
      if (state.chosenCategory === "All Products") {
        state.filteredProducts = state.products.filter(
          (product) =>
            product.price >= state.priceRange[0] &&
            product.price <= state.priceRange[1]
        );
      } else {
        state.filteredProducts = state.products
          .filter((prd) => prd.category === state.chosenCategory)
          .filter(
            (p) =>
              p.price >= state.priceRange[0] && p.price <= state.priceRange[1]
          );
      }
      // Sort filtered products based on chosen sorting
      state.filteredProducts = sorting(
        state.filteredProducts,
        state.chosenSorting
      );
    },
    setEditedItem: (state, action) => {
      const index = state.products.findIndex((product) => {
        return product._id === action.payload._id;
      });
      state.products[index] = action.payload;
    },
    setNewItem:(state,action)=>{
      state.products.unshift(action.payload)
    }
  },
});

export const {
  setAllProducts,
  setChosenProduct,
  setAllCategories,
  setChosenCategory,
  setAllSort,
  setChosenSort,
  setPriceRange,
  setEditedItem,
  setNewItem
} = productSlice.actions;

export default productSlice.reducer;
