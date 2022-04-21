/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CatState {
	url: string;
	id: string;
}

export const catSlice = createSlice({
	name: "catSlicer",
	initialState: {
		url: "",
		id: "",
	},
	reducers: {
		setCat: (state, action: PayloadAction<CatState>) => {
			state.url = action.payload.url;
			state.id = action.payload.id;
		},
	},
});

export const { setCat } = catSlice.actions;

export default catSlice.reducer;
