import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  isSuccess: false,
  message: null,
};

export const authenticationSlice = createSlice({
  name: "authenticateUser",
  initialState,
  reducers: {
    loginInitialise: (state) => {
      state.loading = true;
      state.data = null;
      state.message = null;
      state.isSuccess = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
      state.message = "Login Success!";
    },
    loginError: (state) => {
      state.loading = false;
      state.data = null;
      state.isSuccess = false;
      state.message = "Username or password incorrect!";
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { loginInitialise, loginSuccess, loginError, logout } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
