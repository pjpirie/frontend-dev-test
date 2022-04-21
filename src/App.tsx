/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import TuneIcon from "@material-ui/icons/Tune";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { bindActionCreators } from "redux";
import { fetchCatData } from "./API/fetchData";
// import PetsIcon from "@material-ui/icons/Pets";

// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { AppContainer, AppHeader, AppMain, Button } from "./Styled/Components";
import CardComponent from "./Components/CardComponent";
import CardControls from "./Components/CardControls";
import "./global.css";
import { CatState, setCat } from "./state/slice/catSlice";
import { Cat } from "./state/store";
import MainView from "./Views/Main.view";
import NavComponent from "./Components/NavComponent";
import FavView from "./Views/Fav.view";

function App() {
	const catData: CatState = useSelector(Cat);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const data = await fetchCatData();
			dispatch(setCat(data[0]));
			setLoading(false);
		})();
	}, []);

	const getNewCat = async () => {
		const data = await fetchCatData();
		dispatch(setCat(data[0]));
	};

	// console.log(catData);
	return (
		<Router>
			<AppContainer>
				<AppHeader>
					<Button>
						<Link to="/">
							<TuneIcon />
						</Link>
						<Link to="/fav">
							<TuneIcon />
						</Link>
					</Button>
				</AppHeader>
				<AppMain>
					<Routes>
						<Route
							path="/"
							element={
								<MainView
									catData={catData}
									getNewCat={getNewCat}
									loading={loading}
								/>
							}
						/>
						<Route path="/fav" element={<FavView />} />
					</Routes>
					<NavComponent />
				</AppMain>
			</AppContainer>
		</Router>
	);
}

export default App;
