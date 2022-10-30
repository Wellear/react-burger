import { createSlice } from "@reduxjs/toolkit";

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: {
    bun: [],
    ingredients: [],
  },
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addFilling: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeFilling: (state, action) => {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.uniqueId !== action.payload
        ),
      };
    },
    swapFilling: (state, action) => {
      state.ingredients.splice(
        action.payload.toIndex,
        0,
        ...state.ingredients.splice(action.payload.fromIndex, 1)
      );
    },
    resetConstructor: (state) => {
      state.bun = [];
      state.ingredients = [];
    },
  },
});

export const {
  addBun,
  addFilling,
  removeFilling,
  swapFilling,
  resetConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
