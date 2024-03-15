import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication.slice";
import userInfoReducer from "./slices/userInfo.slice";
import  allProductReducer  from "./slices/products.slice";

export const store = configureStore({
  reducer: {
    authenticateUser: authenticationReducer,
    userInfo: userInfoReducer,
    allProduct: allProductReducer,
  },
});
