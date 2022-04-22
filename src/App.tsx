/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import PetsIcon from "@material-ui/icons/Pets";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhotoIcon from "@material-ui/icons/Photo";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { getFavorites } from "./API/favourites";
import { getCatData } from "./API/search";
import { AppContainer, AppHeader, AppMain, Button } from "./Styled/Components";
import { CatState, setCats } from "./state/slice/catSlice";
import { Cats, User, Fav } from "./state/store";
import MainView from "./Views/Main.view";
import NavComponent from "./Components/NavComponent";
import FavView from "./Views/Fav.view";
import "./global.css";
import { setFavs } from "./state/slice/favSlice";
import HeaderComponent from "./Components/HeaderComponent";
import AccountView from "./Views/Account.view";

function App() {
	const catData = useSelector(Cats);
	const dispatch = useDispatch();
	const userID = useSelector(User).uuid;
	const favourites = useSelector(Fav);
	const [isLoading, setLoading] = useState(true);
	const [catPage, setCatPage] = useState(0);
	const location = useLocation().pathname;

	const Initialise = useCallback(async () => {
		const data: CatState[] = await getCatData(catPage);
		dispatch(setCats(data));
		setLoading(false);
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
				<Routes>
					<Route path="/" element={<MainView />} />
					<Route path="/fav" element={<FavView />} />
					<Route path="/upload" element={<AccountView />} />
				</Routes>
				<NavComponent />
			</AppMain>
		</AppContainer>
	);
}

export default App;
