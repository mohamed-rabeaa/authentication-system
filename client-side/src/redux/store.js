import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/authSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  }, 
});
