import { createSlice } from "@reduxjs/toolkit";

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState: {
    ingredients: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    getRequest: (state) => {
      state.isLoading = true;
    },
    requestSuccessed: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    },
    requestFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {
  getRequest,
  requestSuccessed,
  requestFailed,
} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
