import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { addFavorite, removeFavorite } from "../API/favourites";
import { addFav, setFavs } from "../state/slice/favSlice";
import { setToast } from "../state/slice/toastSlice";
import { Fav, User } from "../state/store";
import { CatCard } from "../Styled/Components";
import Overlay from "./overlay/OverlayComponent";
import OverlayType from "./overlay/overlayTypes";
import ToastType from "./toast/toastTypes";
import { useOverlay } from "../Context";

interface CardProps {
	url: string;
	id: string;
	favID?: string;
}

export default function CardComponent(props: CardProps) {
	const { url, id, favID } = props;
	/**
	 *	The following is to remove the "no-unused-vars" on the custom hook that
	 *	returns reference to overlay state and setState.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [overlay, setOverlay] = useOverlay();
	const userData = useSelector(User);
	const favData = useSelector(Fav).favStore;
	const dispatch = useDispatch();
	const [favoriteId, setFavouriteId] = useState(
		favID !== undefined ? favID : "",
	);
	const [isFavorite, setFavorite] = useState(
		favData.filter((item) => item.image_id === id).length > 0,
	);
	const location = useLocation().pathname.split("/")[1];

	const handleFavorite = async () => {
		if (isFavorite) {
			const data: any = await removeFavorite(favoriteId);
			setFavorite(false);

			if (data.status === 200) {
				dispatch(
					setToast({
						type: ToastType.UNFAVOURITE,
						message: "Cat Unfavourited",
						duration: 2000,
					}),
				);
			}
			// Error Handlind
			if (data.status !== 200) {
				dispatch(
					setToast({
						type: ToastType.ERROR,
						message: "Error Unfavouriting Cat",
						duration: 5000,
					}),
				);
			}
			dispatch(setFavs(favData.filter((item: any) => item.image_id !== id)));
			return;
		}
		const data = await addFavorite(id, userData.uuid);
		setFavouriteId(data.id);
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
		// Error Handlind
		if (!data.created_at) {
			dispatch(
				setToast({
					type: ToastType.ERROR,
					message: "Error Favouriting Cat",
					duration: 5000,
				}),
			);
		}
		setOverlay(OverlayType.FAVOURITE, 2000);
	};

	return (
		<Suspense fallback={<PulseLoader />}>
			<CatCard className={location}>
				<img src={url} alt={id} />
				<Overlay />
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

CardComponent.defaultProps = {
	favID: undefined,
};
