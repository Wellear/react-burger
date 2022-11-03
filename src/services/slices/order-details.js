import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    info: {
      name: "",
      order: {
        number: null,
      },
      success: false,
    },
    isLoading: false,
    hasError: false,
  },
  reducers: {
    getRequest: (state) => {
      state.isLoading = true;
    },
    getSuccessed: (state, action) => {
      state.isLoading = false;
      state.info = action.payload;
    },
    getFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {
  getRequest,
  getSuccessed,
  getFailed,
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
