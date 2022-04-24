import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import { FavoriteType, getFavorites } from "../API/favourites";
import FeedComponent from "../Components/FeedComponent";
import { setFavs } from "../state/slice/favSlice";
import { Fav, User } from "../state/store";

function FavView() {
	const [favData, setFavData] = useState<FavoriteType[]>(
		useSelector(Fav).favStore,
	);
	const userID = useSelector(User).uuid;
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		if (favData[0]) {
			if (favData[0].image.url !== "www.google.com") setLoading(false);
			if (favData[0].image.url === "www.google.com") {
				(async () => {
					const data = await getFavorites(userID);
					setFavData(data);
					dispatch(setFavs(data));
					setLoading(false);
				})();
			}
		}
		setLoading(false);
	}, [dispatch, userID, favData]);

	if (loading) return <PulseLoader />;
	if (favData.length < 1)
		return <h1>You haven&apos;t favorited any cats :C</h1>;
	if (favData.length > 1) {
		if (favData[0].image.url === "www.google.com")
			return <h1>You haven&apos;t favorited any cats :C</h1>;
	}
	return (
		<>
			{favData.map(({ created_at, image, id }: FavoriteType) => {
				const date = new Date(created_at);
				return (
					<FeedComponent
						key={id}
						url={image.url}
						id={image.id}
						favID={id}
						date={date}
					/>
				);
			})}
		</>
	);
}

export default FavView;
