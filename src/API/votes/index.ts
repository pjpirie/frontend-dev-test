export interface VoteData {
	id: string;
	image_id: string;
	sub_id: string;
	value: number;
}

/**
 * @author: Paul Pirie
 * @async
 * @description Gets the votes for specific API key
 * @method GET
 * @target https://api.thecatapi.com/v1/votes
 * @example getVote();
 * @throws throws an error if the request fails
 * @returns Promise<VoteData[]>
 */
export const getVote = async (subID: string | undefined = undefined) => {
	const req: VoteData[] = await fetch(
		`https://api.thecatapi.com/v1/votes${
			subID !== undefined ? `?sub_id=${subID}` : ""
		}`,
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

/**
 * @author: Paul Pirie
 * @async
 * @description Submits a vote for a specific cat image.
 * @method POST
 * @target https://api.thecatapi.com/v1/votes
 * @param catID: string
 * @param userID: string
 * @param voteValue : 1 or 0
 * @example addFavorite("cat-image-id","your-user-id");
 * @throws throws an error if the parameters are not provided
 * @throws throws an error if the parameters are invalid
 * @throws throws an error if the request fails
 * @returns Object{voteID: string, message: string}
 */
export const submitVote = async (
	catID: string,
	voteValue: number,
	userID: string,
) => {
	// Data Validations
	if (catID === (null || undefined))
		throw new Error("image id is required to vote");
	if (voteValue === (null || undefined))
		throw new Error("vote value is required to vote");
	if (userID === (null || undefined))
		throw new Error("user id is required to vote");
	if (voteValue > 1 || voteValue < 0)
		throw new Error(
			"voteValue must be between 0 or 1, 0 = down vote, 1 = up vote",
		);
	const votes = await getVote(userID);
	const userVotes = votes.filter((item) => {
		if (item.image_id === catID) {
			if (item.sub_id === userID) {
				return true;
			}
		}
		return false;
	});
	let message: { message: string } | undefined;

	if (userVotes.length > 0) {
		if (userVotes[0].value === voteValue) return { message: "VOTE_EXISTS" };
		if (userVotes[0].value !== voteValue) message = { message: "VOTE_CHANGED" };
	}

	// API Request
	const req = await fetch(`https://api.thecatapi.com/v1/votes`, {
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
		.then((data) => {
			if (message === undefined) {
				return data;
			}
			const responce = data;
			responce.message = message.message;
			return responce;
		})
		.catch((err) => new Error(err));

	return req;
};
