import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InfoIcon from "@material-ui/icons/Info";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { clearToast, setToast } from "../../state/slice/toastSlice";
import { Toast } from "../../state/store";
import {
	Button,
	Toast as ToastComp,
	ToastContainer,
} from "../../Styled/Components";
import ToastType from "./toastTypes";

interface ErrorType {
	type: string | JSX.Element;
	color: string;
}

export default function ToastComponent() {
	const toast = useSelector(Toast);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(clearToast());
		}, toast.duration);
	}, [dispatch, toast.type, toast.duration]);

	const getErrorData = (): ErrorType => {
		switch (toast.type) {
			case ToastType.ERROR:
				return { type: <ErrorIcon />, color: "red" };
			case ToastType.SUCCESS:
				return { type: <CheckCircleIcon />, color: "green" };
			case ToastType.INFO:
				return { type: <InfoIcon />, color: "blue" };
			case ToastType.FAVOURITE:
				return { type: <FavoriteIcon />, color: "red" };
			case ToastType.UNFAVOURITE:
				return { type: <FavoriteBorderIcon />, color: "red" };
			case ToastType.UPVOTE:
				return { type: <ArrowUpwardIcon />, color: "green" };
			case ToastType.DOWNVOTE:
				return { type: <ArrowDownwardIcon />, color: "red" };
			default:
				return { type: "", color: "" };
		}
	};

	return (
		<ToastContainer className={toast.type !== ToastType.NONE ? "active" : ""}>
			<ToastComp>
				<div className="toast-header">
					<strong className={getErrorData().color}>
						{getErrorData().type}
					</strong>
					<Button
						onClick={() =>
							dispatch(setToast({ type: ToastType.NONE, message: "" }))
						}
					>
						<CloseIcon />
					</Button>
				</div>
				<div className="toast-body">{toast.message}</div>
			</ToastComp>
		</ToastContainer>
	);
}
