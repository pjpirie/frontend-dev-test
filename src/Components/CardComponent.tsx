import PulseLoader from "react-spinners/PulseLoader";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { removeFavorite, addFavorite } from "../API/favourites";
import { CatCard } from "../Styled/Components";
import { Fav, User } from "../state/store";
import { addFav } from "../state/slice/favSlice";
import Overlay from "./OverlayComponent";
import { setToast } from "../state/slice/toastSlice";
import ToastType from "./toast/toastTypes";

interface CardProps {
	url: string;
	id: string;
}
// interface FavResponse {
// 	id: string;
// 	created_at: string;
// }

export default function CardComponent(props: CardProps) {
	const { url, id } = props;
	const userData = useSelector(User);
	const favData = useSelector(Fav).favStore;
	const dispatch = useDispatch();
	const [favId, setFavId] = useState("");
	const [isFavorite, setFavorite] = useState(
		favData.filter((item) => item.image_id === id).length > 0,
	);
	const location = useLocation().pathname.split("/")[1];

	const [isActive, setActive] = useState(false);

	const handleFavorite = async () => {
		if (isFavorite) {
			await removeFavorite(favId);
			setFavorite(false);
			dispatch(
				setToast({
					type: ToastType.UNFAVOURITE,
					message: "Cat Unfavourited",
					duration: 2000,
				}),
			);
		} else {
			setActive(true);
			const data = await addFavorite(id, userData.uuid);
			setFavId(data.id);
			setFavorite(true);
			dispatch(addFav(data));
			if (data.created_at) {
				dispatch(
					setToast({
						type: ToastType.FAVOURITE,
						message: "Cat Favourited",
						duration: 3000,
					}),
				);
			}
		}
		setTimeout(() => {
			setActive(false);
		}, 1000);
	};

	return (
		<Suspense fallback={<PulseLoader />}>
			<CatCard className={location}>
				<img src={url} alt={id} />
				<Overlay Icon={FavoriteIcon} isActive={isActive} />
				{isFavorite ? (
					<FavoriteIcon className="icon red" onClick={() => handleFavorite()} />
				) : (
					<FavoriteBorderIcon
						className="icon"
						onClick={() => handleFavorite()}
					/>
				)}
			</CatCard>
		</Suspense>
	);
}
