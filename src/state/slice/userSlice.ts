import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface UserState {
	uuid: string;
}

let userID: string | null = window.localStorage.getItem("sub_id");
if (userID === null || userID === undefined) {
	userID = uuidv4();
	window.localStorage.setItem("sub_id", userID);
}

export const userSlice = createSlice({
	name: "userSlicer",
	initialState: {
		uuid: userID,
	},
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.uuid = action.payload.uuid;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
