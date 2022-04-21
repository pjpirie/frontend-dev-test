import PulseLoader from "react-spinners/PulseLoader";
import CardComponent from "../Components/CardComponent";
import CardControls from "../Components/CardControls";
import { CatState } from "../state/slice/catSlice";

interface Props {
	catData: CatState;
	getNewCat: Function;
	loading: boolean;
}

function MainView(props: Props) {
	const { catData, getNewCat, loading } = props;
	const { id, url } = catData;
	if (loading) return <PulseLoader />;
	return (
		<>
			<CardComponent url={url} id={id} />
			<CardControls id={id} getNewCat={getNewCat} />
		</>
	);
}

export default MainView;
