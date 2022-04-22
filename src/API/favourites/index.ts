export interface FavoriteImage {
	id: string;
	url: string;
}
export interface FavoriteType {
	id: string;
	image: FavoriteImage;
	image_id: string;
	isFav?: boolean;
}

/**
 * @author: Paul Pirie
 * @async
 * @description Adds the cat image as a favorite of a specific user
 * @method POST
 * @target https://api.thecatapi.com/v1/favourites
 * @param catID: string
 * @param userID: string
 * @example addFavorite("cat-image-id","your-user-id");
 * @throws throws an error if the parameters are not provided
 * @throws throws an error if the request fails
 * @returns Object{favoriteID: string, message: string}
 */
export const addFavorite = async (catID: string, userID: string) => {
	// Data Validations
	if (catID === (null || undefined))
		throw new Error("image id is required to add a favorite");
	if (userID === (null || undefined))
		throw new Error("user id is required to add a favorite");

	// API Request
	const req = await fetch(`https://api.thecatapi.com/v1/favourites`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key":
				import.meta.env.VITE_API_KEY || "4a989167-9038-43f6-89c7-9fb0956bd2ab",
		},
		body: JSON.stringify({
			image_id: catID,
			sub_id: userID,
		}),
	})
		.then((res) => res.json())
		.catch((err) => new Error(err));

	return req;
};

/**
 * @author: Paul Pirie
 * @async
 * @description removes the cat image as a favorite of a specific user using
 * @method DELETE
 * @target https://api.thecatapi.com/v1/favourites/{favorite_id}
 * @param favID: string
 * @example removeFavorite("favourite-id");
 * @throws throws an error if the parameters are not provided
 * @throws throws an error if the request fails
 * @returns none
 */
export const removeFavorite = (favID: string) => {
	// Data Validations
	if (favID === (null || undefined))
		throw new Error("favorite id is required to remove a favorite");

	// API Request
	fetch(`https://api.thecatapi.com/v1/favourites/${favID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-api-key":
				import.meta.env.VITE_API_KEY || "4a989167-9038-43f6-89c7-9fb0956bd2ab",
		},
	}).catch((err) => new Error(err));
};

/**
 * @author: Paul Pirie
 * @async
 * @description gets all of the favorited cats of a specific user
 * @method GET
 * @param userID: string
 * @example getFavorites("userID");
 * @throws throws an error if the parameters are not provided
 * @throws throws an error if the request fails
 * @returns Promise<CatState[]>
 */
export const getFavorites = async (userID: string) => {
	// Data Validations
	if (userID === (null || undefined))
		throw new Error("user id is required to fetch favorites");

	// API Request
	const req = await fetch(
		`https://api.thecatapi.com/v1/favourites?sub_id=${userID}&order=desc`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key":
					import.meta.env.VITE_API_KEY ||
					"4a989167-9038-43f6-89c7-9fb0956bd2ab",
			},
		},
	)
		.then((res) => res.json())
		.catch((err) => new Error(err));

	return req;
};
