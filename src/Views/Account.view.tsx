import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../state/store";
import { CatState } from "../state/slice/catSlice";
import { getAccountCatData } from "../API/search";
import FeedComponent from "../Components/FeedComponent";

function AccountView() {
	const [catData, setCatData] = useState<CatState[]>([]);
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
	if (catData.length < 1) return <h1>You haven&apos;t uploaded any cats :C</h1>;
	return (
		<>
			{catData.map((data: CatState) => {
				const { url, id, voteVal } = data;
				return (
					<FeedComponent
						key={id}
						url={url}
						id={id}
						voteVal={voteVal}
						accountCatData={{ catData, setCatData }}
					/>
				);
			})}
		</>
	);
}

export default AccountView;
