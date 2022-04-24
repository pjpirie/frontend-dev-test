import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ToastType from "../../Components/toast/toastTypes";

export interface ToastState {
	type: ToastType;
	message: string;
	duration?: number;
}

export const toastSlice = createSlice({
	name: "userSlicer",
	initialState: {
		type: "None",
		message: "",
		duration: 5000,
	},
	reducers: {
		setToast: (state, action: PayloadAction<ToastState>) => {
			state.type = action.payload.type;
			state.message = action.payload.message;
			if (action.payload.duration) state.duration = action.payload.duration;
		},
		clearToast: (state) => {
			state.type = "None";
			state.message = "";
			state.duration = 5000;
		},
	},
});

export const { setToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
