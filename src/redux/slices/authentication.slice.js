import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const authenticationSlice = createSlice({
  name: "authenticateUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
