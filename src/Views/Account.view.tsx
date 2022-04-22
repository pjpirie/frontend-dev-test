import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardComponent from "../Components/CardComponent";
import CardControls from "../Components/CardControls";
import { User } from "../state/store";
import { CatState } from "../state/slice/catSlice";
import { FeedCard } from "../Styled/Components";
import { getAccountCatData } from "../API/search";

function AccountView() {
	const [catData, setCatData] = useState([]);
	const userID = useSelector(User).uuid;
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const data = await getAccountCatData(userID);
			setCatData(data);
			setLoading(false);
		})();
	}, [userID]);

	if (loading) return <PulseLoader />;
	if (catData.length < 1) return <h1>No Cats :C</h1>;
	return (
		<>
			{catData.map((data: CatState) => {
				const { url, id, voteVal } = data;
				return (
					<FeedCard key={id}>
						<CardComponent url={url} id={id} />
						<CardControls id={id} voteVal={voteVal} />
					</FeedCard>
				);
			})}
		</>
	);
}
// return <h1>No Cats :C</h1>;

export default AccountView;
