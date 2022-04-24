import { useLocation, NavLink } from "react-router-dom";
import PetsIcon from "@material-ui/icons/Pets";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhotoIcon from "@material-ui/icons/Photo";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader, Button } from "../Styled/Components";
import { uploadCat, UploadResponce } from "../API/upload";
import { User } from "../state/store";
import { setToast } from "../state/slice/toastSlice";
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
		}
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
