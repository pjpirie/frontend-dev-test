/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./slice/catSlice";
import userReducer from "./slice/userSlice";
import favReducer from "./slice/favSlice";

export const store = configureStore({
	reducer: { cats: catReducer, user: userReducer, fav: favReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const Cats = (state: RootState) => state.cats;
export const User = (state: RootState) => state.user;
export const Fav = (state: RootState) => state.fav;
