import "./global.css";

import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { getCatData } from "./API/search";
import HeaderComponent from "./Components/HeaderComponent";
import CustomScrollbar from "./Components/ScrollbarComponent";
import ToastComponent from "./Components/toast/ToastComponent";
import { CatState, setCats } from "./state/slice/catSlice";
import { AppContainer, AppMain, AuthorTag } from "./Styled/Components";
import AccountView from "./Views/Account.view";
import FavView from "./Views/Fav.view";
import MainView from "./Views/Main.view";

function App() {
	const dispatch = useDispatch();

	const Initialise = useCallback(async () => {
		const data: CatState[] = await getCatData();
		dispatch(setCats(data));
	}, [dispatch]);

	useEffect(() => {
		Initialise();
	}, [Initialise]);

	return (
		<AppContainer>
			<CustomScrollbar />
			<HeaderComponent />
			<AppMain>
				<ToastComponent />
				<Routes>
					<Route path="/" element={<MainView />} />
					<Route path="/fav" element={<FavView />} />
					<Route path="/upload" element={<AccountView />} />
				</Routes>
			</AppMain>
			<AuthorTag>Built By Paul Pirie</AuthorTag>
		</AppContainer>
	);
}

export default App;
