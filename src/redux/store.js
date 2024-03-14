import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication.slice";

export const store = configureStore({
  reducer: {
    authenticateUser: authenticationReducer,
  },
});
