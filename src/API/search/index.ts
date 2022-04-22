import { CatState } from "../../state/slice/catSlice";
import { getVote, VoteData } from "../votes";

/**
 * Fetch cat data from API
 * @author: Paul Pirie
 * @async
 * @description Get data for the first 20 cats from the API
 * @method GET
 * @target https://api.thecatapi.com/v1/images/search
 * @param pageNumber: number
 * @example getCatsData(pageNumber: number);
 * @returns Promise<CatState[]>
 */
export const getCatData = async (pageNumber: number = 0) => {
	const catReq = await fetch(
		`https://api.thecatapi.com/v1/images/search?page=${pageNumber}&limit=20&order=desc`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(`Error fetching cat data: ${err}`);
		});

	const voteData: VoteData[] = await getVote();

	const data: CatState[] = [];
	catReq.forEach((item: CatState) => {
		const catData: CatState = item;
		const votes = voteData.filter((vote) => vote.image_id === item.id);
		if (catData.voteVal === undefined) catData.voteVal = 0;
		if (votes.length > 0) {
			votes.forEach((vote) => {
				if (vote.value > 0) catData.voteVal += 1;
				if (vote.value === 0) catData.voteVal -= 1;
			});
		}
		if (votes.length === 0) catData.voteVal = 0;
		data.push(catData);
	});

	return data;
};

/**
 * @author: Paul Pirie
 * @async
 * @description Get data for the first 50 cats that belong to a specific user from the API
 * @method GET
 * @target https://api.thecatapi.com/v1/images
 * @param userID: string
 * @example getAccountCatData("your-user-id");
 * @throws throws an error if the request fails
 * @returns Promise<CatState[]>
 */
export const getAccountCatData = async (userID: string) => {
	const resData = await fetch(
		`https://api.thecatapi.com/v1/images?sub_id${userID}&limit=50&order=desc`,
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
		.catch((err) => {
			throw new Error(`Error fetching cat data: ${err}`);
		});

	const voteData: VoteData[] = await getVote();
	const data: CatState[] = [];
	resData.forEach((item: CatState) => {
		const catData: CatState = item;
		const votes = voteData.filter((vote) => vote.image_id === item.id);
		if (catData.voteVal === undefined) catData.voteVal = 0;
		if (votes.length > 0) {
			votes.forEach((vote) => {
				if (vote.value > 0) catData.voteVal += 1;
				if (vote.value === 0) catData.voteVal -= 1;
			});
		}
		if (votes.length === 0) catData.voteVal = 0;
		data.push(catData);
	});

	return resData;
};
