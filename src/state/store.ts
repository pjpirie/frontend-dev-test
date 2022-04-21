/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./slice/catSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
	reducer: { cat: catReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const Cat = (state: RootState) => state.cat;
export const User = (state: RootState) => state.user;
