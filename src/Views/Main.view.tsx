import { useSelector } from "react-redux";

import FeedComponent from "../Components/FeedComponent";
import { CatState } from "../state/slice/catSlice";
import { Cats } from "../state/store";

function MainView() {
	const catData = useSelector(Cats).catStore;

	if (catData.length > 2) {
		return (
			<>
				{catData.map((data: CatState) => {
					const { url, id, voteVal } = data;
					return <FeedComponent key={id} url={url} id={id} voteVal={voteVal} />;
				})}
			</>
		);
	}
	return <h1>No Cats :C</h1>;
}

export default MainView;
