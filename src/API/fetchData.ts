/* eslint-disable no-console */

export const fetchCatData = async () => {
	console.log(
		import.meta.env.VITE_API_KEY || "4a989167-9038-43f6-89c7-9fb0956bd2ab",
	);
	const req = await fetch(`https://api.thecatapi.com/v1/images/search`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(`Error fetching cat data: ${err}`);
		});
	return req;
};

// https://api.thecatapi.com/v1/favourites

export const addFavorite = (catID: string, userID: string | null) => {
	if (catID === (null || undefined))
		throw new Error("image id is required to add a favorite");
	if (userID === (null || undefined))
		throw new Error("user id is required to add a favorite");
	console.log({ catID, userID });
	fetch(`https://api.thecatapi.com/v1/favourites`, {
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
		.then((data) => console.log(data))
		.catch((err) => new Error(err));
};

export const removeFavorite = (catID: string, userID: string | null) => {
	if (catID === (null || undefined))
		throw new Error("image id is required to add a favorite");
	if (userID === (null || undefined))
		throw new Error("user id is required to add a favorite");
	console.log({ catID, userID });
	fetch(`https://api.thecatapi.com/v1/favourites`, {
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
		.then((data) => console.log(data))
		.catch((err) => new Error(err));
};

export const getFavorites = (userID: string | null) => {
	if (userID === (null || undefined))
		throw new Error("user id is required to fetch favorites");
	console.log({ userID });
	fetch(`https://api.thecatapi.com/v1/favourites?sub_id=${userID}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-api-key":
				import.meta.env.VITE_API_KEY || "4a989167-9038-43f6-89c7-9fb0956bd2ab",
		},
		body: JSON.stringify({
			sub_id: userID,
		}),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => new Error(err));
};

export const submitVote = (
	catID: string,
	voteValue: number,
	userID: string | null,
) => {
	if (catID === (null || undefined))
		throw new Error("image id is required to vote");
	if (voteValue === (null || undefined))
		throw new Error("vote value is required to vote");
	if (userID === (null || undefined))
		throw new Error("user id is required to vote");
	console.log({ catID, voteValue, userID });
	fetch(`https://api.thecatapi.com/v1/votes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key":
				import.meta.env.VITE_API_KEY || "4a989167-9038-43f6-89c7-9fb0956bd2ab",
		},
		body: JSON.stringify({
			image_id: catID,
			value: voteValue,
			sub_id: userID,
		}),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => new Error(err));
};
