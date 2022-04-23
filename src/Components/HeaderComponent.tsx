/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, Link } from "react-router-dom";
import PetsIcon from "@material-ui/icons/Pets";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhotoIcon from "@material-ui/icons/Photo";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { DOMElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContainer, AppHeader, AppMain, Button } from "../Styled/Components";
import { uploadCat } from "../API/upload";
import { User } from "../state/store";
import { setToast } from "../state/slice/toastSlice";
import ToastType from "./toast/toastTypes";

function HeaderComponent() {
	const userID = useSelector(User).uuid;
	const location = useLocation().pathname;
	const fileInput = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const handleClick = (inputElement: any) => {
		inputElement.current.click();
		// dispatch(
		// 	setToast({ type: "Error", message: "Uploading is not yet implemented" }),
		// );
	};

	const handleUpload = async (e: any) => {
		const file = e.target.files[0];
		// File Validation
		if (file === undefined) return;
		if (file.type !== "image/png" && file.type !== "image/jpeg") {
			dispatch(
				setToast({
					type: ToastType.ERROR,
					message: "File must be a png or jpeg.",
				}),
			);
			return;
		}
		dispatch(setToast({ type: ToastType.INFO, message: "Uploading File." }));
		const upload = await uploadCat(userID, file);
		if (upload.id !== undefined) {
			dispatch(
				setToast({ type: ToastType.SUCCESS, message: "Upload successful." }),
			);
		}
	};
	return (
		<AppHeader>
			<Button className="reset">
				<Link to="/">
					<PetsIcon />
				</Link>
			</Button>
			<Button className="reset">
				{location === "/upload" ? (
					<>
						<input
							type="file"
							style={{ display: "none" }}
							onChange={handleUpload}
							accept="image/jpeg, image/png"
							ref={fileInput}
						/>
						<AddCircleIcon onClick={() => handleClick(fileInput)} />
					</>
				) : (
					<Link to="/upload">
						<PhotoIcon />
					</Link>
				)}
			</Button>
			<Button className="reset">
				<Link to="/fav">
					<FavoriteIcon />
				</Link>
			</Button>
		</AppHeader>
	);
}

export default HeaderComponent;
