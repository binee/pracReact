import { configureStore } from "@reduxjs/toolkit";
import carReducer from './cars/carslice';
import userReducer from './user/userslice';

export const store = configureStore({
    //Register car reducer
  reducer: {
    car: carReducer,
    user: userReducer
  }
});
