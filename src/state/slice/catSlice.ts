/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CatState {
	url: string;
	id: string;
	voteVal: number;
}

export interface CatStore {
	catStore: CatState[];
}

export const catSlice = createSlice({
	name: "catSlicer",
	initialState: {
		catStore: [
			{
				url: "www.google.com",
				id: "someID",
				voteVal: 0,
			},
		],
	},
	reducers: {
		setCats: (state, action: PayloadAction<any>) => {
			// console.log(action.payload);
			state.catStore = action.payload;
		},
		addCat: (state, action: PayloadAction<any>) => {
			// console.log(action.payload);
			state.catStore = [...state.catStore, action.payload];
		},
		removeCat: (state, action: PayloadAction<any>) => {
			// console.log(action.payload);
			state.catStore = state.catStore.filter(
				(item) => item.id !== action.payload,
			);
		},
	},
});

export const { setCats, addCat, removeCat } = catSlice.actions;

export default catSlice.reducer;
