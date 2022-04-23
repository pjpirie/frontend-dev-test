import { useSelector } from "react-redux";

import CardComponent from "../Components/CardComponent";
import CardControls from "../Components/CardControls";
// import FeedComponent from "../Components/FeedComponent";
import { CatState } from "../state/slice/catSlice";
import { Cats } from "../state/store";
import { FeedCard } from "../Styled/Components";

function MainView() {
	const catData = useSelector(Cats).catStore;

	if (catData.length > 2) {
		return (
			<>
				{catData.map((data: CatState) => {
					const { url, id, voteVal } = data;
					return (
						<FeedCard key={id}>
							<CardComponent url={url} id={id} />
							<CardControls id={id} voteVal={voteVal} />
						</FeedCard>
						// <FeedComponent url={url} id={id} voteVal={voteVal} />
					);
				})}
			</>
		);
	}
	return <h1>No Cats :C</h1>;
}

export default MainView;
