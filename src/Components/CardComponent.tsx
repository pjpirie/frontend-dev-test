import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useState } from "react";
import { useSelector } from "react-redux";
import { removeFavorite, addFavorite } from "../API/fetchData";
import { CatCard } from "../Styled/Components";
import { User } from "../state/store";

interface CatData {
	url: string;
	id: string;
}

export default function CardComponent({ url, id }: CatData) {
	const userData = useSelector(User);
	const [isFavorite, setFavorite] = useState(false);
	return (
		<CatCard image_url={url}>
			{isFavorite ? (
				<FavoriteIcon
					onClick={() => {
						removeFavorite(id, userData.uuid);
						setFavorite(false);
					}}
				/>
			) : (
				<FavoriteBorderIcon
					onClick={() => {
						addFavorite(id, userData.uuid);
						setFavorite(true);
					}}
				/>
			)}
		</CatCard>
	);
}
