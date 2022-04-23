// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useSelector } from "react-redux";
import { FavoriteType } from "../API/favourites";
import CardComponent from "../Components/CardComponent";
import { Fav } from "../state/store";
import { FeedCard } from "../Styled/Components";

function FavView() {
	const favData = useSelector(Fav).favStore;
	// const userID = useSelector(User).uuid;
	// const [favourites, setFavorites] = useState<FavoriteType[]>([]);
	// useEffect(() => {
	// 	(async () => {
	// 		const data = await getFavorites(userID);
	// 		setFavorites(data);
	// 	})();
	// }, []);

	return (
		<>
			{favData.map((fav: FavoriteType) => {
				const date = new Date(fav.created_at);
				return (
					<FeedCard key={fav.id}>
						<CardComponent url={fav.image.url} id={fav.image.id} />
						<div className="FavData__Container">
							<ScheduleIcon />
							<h3>
								{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
							</h3>
						</div>
					</FeedCard>
				);
			})}
		</>
	);
}

export default FavView;
