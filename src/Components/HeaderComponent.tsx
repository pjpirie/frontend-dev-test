import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PetsIcon from "@material-ui/icons/Pets";
import PhotoIcon from "@material-ui/icons/Photo";

import { uploadCat, UploadResponce } from "../API/upload";
import { setToast } from "../state/slice/toastSlice";
import { User } from "../state/store";
import { AppHeader, Button } from "../Styled/Components";
import ToastType from "./toast/toastTypes";

function HeaderComponent() {
	const userID: string = useSelector(User).uuid;
	const location: string = useLocation().pathname;
	const fileInput = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const handleClick = (inputElement: any) => {
		inputElement.current.click();
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
		const upload: UploadResponce = await uploadCat(userID, file);
		if (upload.id !== undefined) {
			dispatch(
				setToast({ type: ToastType.SUCCESS, message: "Upload successful." }),
			);
			return;
		}
		if (upload.status === 400) {
			dispatch(
				setToast({
					type: ToastType.ERROR,
					message: upload.message ? upload.message : "Upload failed.",
				}),
			);
			return;
		}
		dispatch(setToast({ type: ToastType.ERROR, message: "Upload Failed." }));
	};

	const getActiveLink = (url: string) => {
		if (url === location) return "active";
		return "";
	};
	return (
		<AppHeader id="headerComponent">
			<input
				type="file"
				style={{ display: "none" }}
				onChange={handleUpload}
				accept="image/jpeg, image/png"
				ref={fileInput}
			/>
			<Button className={`reset ${getActiveLink("/upload")}`}>
				{location === "/upload" ? (
					<AddCircleIcon onClick={() => handleClick(fileInput)} />
				) : (
					<NavLink to="/upload">
						<PhotoIcon />
					</NavLink>
				)}
			</Button>
			<Button className={`reset ${getActiveLink("/")}`}>
				<NavLink to="/">
					<PetsIcon />
				</NavLink>
			</Button>
			<Button className={`reset ${getActiveLink("/fav")}`}>
				<NavLink to="/fav">
					<FavoriteIcon />
				</NavLink>
			</Button>
		</AppHeader>
	);
}

export default HeaderComponent;
