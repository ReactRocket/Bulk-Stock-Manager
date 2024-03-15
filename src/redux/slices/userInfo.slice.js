import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  isSuccess: false,
  message: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfoInitialise: (state) => {
      state.loading = true;
      state.data = null;
      state.message = null;
      state.isSuccess = false;
    },
    userInfoSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
      state.message = "userInfo-> fetched";
    },
    userInfoError: (state) => {
      state.loading = false;
      state.data = null;
      state.isSuccess = false;
      state.message = "userInfo-> not fetched";
    },
  },
});

export const { userInfoInitialise, userInfoSuccess, userInfoError } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
