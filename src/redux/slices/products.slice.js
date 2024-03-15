import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  isSuccess: false,
  message: null,
};

export const allProductSlice = createSlice({
  name: "allProduct",
  initialState,
  reducers: {
    allProductInitialise: (state) => {
      state.loading = true;
      state.data = null;
      state.message = null;
      state.isSuccess = false;
    },
    allProductSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
      state.message = "allProduct-> fetched";
    },
    allProductError: (state) => {
      state.loading = false;
      state.data = null;
      state.isSuccess = false;
      state.message = "allProduct-> not fetched";
    },
  },
});

export const { allProductInitialise, allProductSuccess, allProductError } =
  allProductSlice.actions;

export default allProductSlice.reducer;
