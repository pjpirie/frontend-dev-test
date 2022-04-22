// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteType, removeFavorite } from "../API/favourites";
import { setFavs } from "../state/slice/favSlice";
import { Fav } from "../state/store";
import { FavList, Favitem } from "../Styled/Components";

function FavView() {
	const favData = useSelector(Fav).favStore;
	const dispatch = useDispatch();
	// const userID = useSelector(User).uuid;
	// const [favourites, setFavorites] = useState<FavoriteType[]>([]);
	// useEffect(() => {
	// 	(async () => {
	// 		const data = await getFavorites(userID);
	// 		setFavorites(data);
	// 	})();
	// }, []);

	// console.log(favData);
	return (
		<FavList>
			{favData.map((fav: FavoriteType) => {
				return (
					<Favitem key={fav.id}>
						<img src={fav.image.url} alt={fav.image.id} />
						<div className="FavData__Container">
							<h3>{fav.image.id}</h3>

							<FavoriteIcon
								onClick={() => {
									removeFavorite(fav.id);
									dispatch(
										setFavs(favData.filter((item) => item.id !== fav.id)),
									);
								}}
							/>
						</div>
					</Favitem>
				);
			})}
		</FavList>
	);
}

export default FavView;
