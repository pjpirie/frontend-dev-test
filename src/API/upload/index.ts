/* eslint-disable import/prefer-default-export */
/**
 * @author: Paul Pirie
 * @async
 * @description Uploads a cat image to the API and links said image to a specific user
 * @method POST
 * @target https://api.thecatapi.com/v1/images/upload
 * @param userID: string
 * @param userFile: File
 * @example uploadCat("your-user-id", yourFile);
 * @throws throws an error if the parameters are not provided
 * @throws throws an error if the request fails
 * @returns Object: {id: string}
 */
export const uploadCat = async (userID: string, userFile: File) => {
	if (userID === undefined || userID === null)
		throw new Error("User id is required to upload a cat image");
	if (userFile === undefined || userFile === null)
		throw new Error("A valid file is required to upload a cat image");

	const formData = new FormData();
	formData.append("file", userFile);
	formData.append("sub_id", userID);

	const resData = await fetch(`https://api.thecatapi.com/v1/images/upload`, {
		method: "POST",
		headers: {
			"x-api-key":
				import.meta.env.VITE_API_KEY || "4a989167-9038-43f6-89c7-9fb0956bd2ab",
		},
		body: formData,
	})
		.then((res) => res.json())
		.catch((err) => new Error(`Error uploading cat data: ${err}`));
	return resData;
};
