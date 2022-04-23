import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./slice/catSlice";
import userReducer from "./slice/userSlice";
import favReducer from "./slice/favSlice";
import toastReducer from "./slice/toastSlice";

export const store = configureStore({
	reducer: {
		cats: catReducer,
		user: userReducer,
		fav: favReducer,
		toast: toastReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export const Cats = (state: RootState) => state.cats;
export const User = (state: RootState) => state.user;
export const Fav = (state: RootState) => state.fav;
export const Toast = (state: RootState) => state.toast;
