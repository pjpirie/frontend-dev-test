import "./global.css";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { getFavorites } from "./API/favourites";
import { getCatData } from "./API/search";
import HeaderComponent from "./Components/HeaderComponent";
import ToastComponent from "./Components/toast/ToastComponent";
import { CatState, setCats } from "./state/slice/catSlice";
import { setFavs } from "./state/slice/favSlice";
import { User } from "./state/store";
import { AppContainer, AppMain } from "./Styled/Components";
import AccountView from "./Views/Account.view";
import FavView from "./Views/Fav.view";
import MainView from "./Views/Main.view";

function App() {
	const dispatch = useDispatch();
	const userID = useSelector(User).uuid;
	const [catPage, setCatPage] = useState(0);

	const Initialise = useCallback(async () => {
		const data: CatState[] = await getCatData(catPage);
		dispatch(setCats(data));
		const favData = await getFavorites(userID);
		dispatch(setFavs(favData));
	}, [catPage, dispatch, userID]);

	useEffect(() => {
		Initialise();
	}, [Initialise]);

	return (
		<AppContainer>
			<HeaderComponent />
			<AppMain>
				<ToastComponent />
				<Routes>
					<Route path="/" element={<MainView />} />
					<Route path="/fav" element={<FavView />} />
					<Route path="/upload" element={<AccountView />} />
				</Routes>
			</AppMain>
		</AppContainer>
	);
}

export default App;
