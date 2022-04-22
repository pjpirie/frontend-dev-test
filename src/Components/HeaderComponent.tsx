/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, Link } from "react-router-dom";
import PetsIcon from "@material-ui/icons/Pets";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhotoIcon from "@material-ui/icons/Photo";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { DOMElement, useRef } from "react";
import { useSelector } from "react-redux";
import { AppContainer, AppHeader, AppMain, Button } from "../Styled/Components";
import { uploadCat } from "../API/upload";
import { User } from "../state/store";

const handleClick = (inputElement: any) => {
	inputElement.current.click();
};

function HeaderComponent() {
	const userID = useSelector(User).uuid;
	const location = useLocation().pathname;
	const fileInput = useRef<HTMLInputElement>(null);

	const handleUpload = (e: any) => {
		const file = e.target.files[0];
		// File Validation
		if (file === undefined) return;
		if (file.type !== "image/png" && file.type !== "image/jpeg") {
			alert("File must be png or jpeg");
			return;
		}
		const upload = uploadCat(userID, file);
	};
	return (
		<AppHeader>
			<Button>
				<Link to="/">
					<PetsIcon />
				</Link>
			</Button>
			<Button>
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
			<Button>
				<Link to="/fav">
					<FavoriteIcon />
				</Link>
			</Button>
		</AppHeader>
	);
}

export default HeaderComponent;
