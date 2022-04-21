import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFavorites } from "../API/fetchData";
import { User } from "../state/store";

function FavView() {
	const userID = useSelector(User).uuid;
	const [favourites, setFavorites] = useState<any>([]);
	useEffect(() => {
		(async () => {
			const data = await getFavorites(userID);
			setFavorites(data);
		})();
	}, []);

	return (
		<div>
			<h1>Fav View</h1>
			{/* {favourites.map((fav) => {
				return (
					<div key={fav.id}>
						<img src={fav.url} alt={fav.id} />
					</div>
				);
			})} */}
		</div>
	);
}

export default FavView;
