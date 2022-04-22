import PulseLoader from "react-spinners/PulseLoader";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { removeFavorite, addFavorite } from "../API/favourites";
import { CatCard } from "../Styled/Components";
import { Fav, User } from "../state/store";
import { addFav } from "../state/slice/favSlice";

interface CatData {
	url: string;
	id: string;
}

interface FavResponse {
	id: string;
}

export default function CardComponent({ url, id }: CatData) {
	const userData = useSelector(User);
	const favData = useSelector(Fav).favStore;
	const dispatch = useDispatch();
	const [favId, setFavId] = useState("");
	const [isFavorite, setFavorite] = useState(
		favData.filter((item) => item.image_id === id).length > 0,
	);
	// console.log({
	// 	imageID: id,
	// 	favData,
	// 	isFavorite,
	// });
	return (
		<Suspense fallback={<PulseLoader />}>
			<CatCard>
				<img src={url} alt={id} />
				{isFavorite ? (
					<FavoriteIcon
						className="icon"
						onClick={() => {
							removeFavorite(favId);
							setFavorite(false);
						}}
					/>
				) : (
					<FavoriteBorderIcon
						className="icon"
						onClick={async () => {
							const favResponse: FavResponse = await addFavorite(
								id,
								userData.uuid,
							);
							setFavId(favResponse.id);
							setFavorite(true);
							dispatch(
								addFav({
									id: favResponse.id,
									image: { id, url },
									image_id: id,
								}),
							);
						}}
					/>
				)}
			</CatCard>
		</Suspense>
	);
}
