import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useSelector, useDispatch } from "react-redux";
import { Button, CardControler } from "../Styled/Components";
import { submitVote } from "../API/votes";
import { User } from "../state/store";
import { removeCat } from "../state/slice/catSlice";
import ToastType from "./toast/toastTypes";
import { setToast } from "../state/slice/toastSlice";

interface ControlProps {
	id: string;
	voteVal: number;
}

function CardControls({ id, voteVal }: ControlProps) {
	const userData = useSelector(User);
	const dispatch = useDispatch();

	const handleVote = async (val: number) => {
		if (id === (null || undefined) || val === (null || undefined)) {
			throw new Error(
				"Voting Requires 2 Parameters: image_id: string, voteValue: number",
			);
		}
		const data = await submitVote(id, val, userData.uuid);
		dispatch(removeCat(id));
		if (data.message === "SUCCESS") {
			if (val === 1) {
				dispatch(
					setToast({
						type: ToastType.UPVOTE,
						message: "Vote Submitted",
						duration: 2000,
					}),
				);
			}
			if (val === 0) {
				dispatch(
					setToast({
						type: ToastType.DOWNVOTE,
						message: "Vote Submitted",
						duration: 2000,
					}),
				);
			}
		} else {
			dispatch(
				setToast({
					type: ToastType.ERROR,
					message: "Vote Failed",
					duration: 5000,
				}),
			);
		}
	};

	return (
		<CardControler>
			<Button>
				<ArrowUpwardIcon onClick={() => handleVote(1)} />
			</Button>
			<h1>{voteVal}</h1>
			<Button>
				<ArrowDownwardIcon onClick={() => handleVote(0)} />
			</Button>
		</CardControler>
	);
}

export default CardControls;
