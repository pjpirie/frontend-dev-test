import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { submitVote } from "../API/votes";
import { useOverlay } from "../Context";
import { CatState, setVoteValue } from "../state/slice/catSlice";
import { setToast } from "../state/slice/toastSlice";
import { User } from "../state/store";
import { Button, CardControler } from "../Styled/Components";
import OverlayType from "./overlay/overlayTypes";
import ToastType from "./toast/toastTypes";

interface ControlProps {
	id: string;
	voteVal: number;
	accountCatData?: {
		catData: CatState[];
		setCatData: Function;
	};
}

function CardControls({ id, voteVal, accountCatData }: ControlProps) {
	const userData = useSelector(User);
	const dispatch = useDispatch();
	const location: string = useLocation().pathname;
	/**
	 *	The following is to remove the "no-unused-vars" on the custom hook that
	 *	returns reference to overlay state and setState.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [overlay, setOverlay] = useOverlay();

	const changeLocalVoteValue = (val: number, isNewVote: boolean = true) => {
		const voteIncrement = isNewVote ? 1 : 2;
		if (location !== "/upload")
			dispatch(
				setVoteValue({
					id,
					voteval: voteVal + (val === 0 ? -voteIncrement : voteIncrement),
				}),
			);
		if (location === "/upload") {
			if (accountCatData) {
				const { catData, setCatData } = accountCatData;
				setCatData(
					catData.map((item) => {
						if (item.id === id) {
							return {
								...item,
								voteVal:
									item.voteVal + (val === 0 ? -voteIncrement : voteIncrement),
							};
						}
						return item;
					}),
				);
			}
		}
	};

	const handleVote = async (val: number) => {
		if (id === (null || undefined) || val === (null || undefined)) {
			throw new Error(
				"Voting Requires 2 Parameters: image_id: string, voteValue: number",
			);
		}
		if (val === 1) setOverlay(OverlayType.UPVOTE, 2000);
		if (val === 0) setOverlay(OverlayType.DOWNVOTE, 2000);
		const data = await submitVote(id, val, userData.uuid);
		if (data.message === "SUCCESS") {
			changeLocalVoteValue(val);

			dispatch(
				setToast({
					type: val > 0 ? ToastType.UPVOTE : ToastType.DOWNVOTE,
					message: "Vote Submitted",
					duration: 2000,
				}),
			);
			return;
		}
		if (data.message === "VOTE_CHANGED") {
			changeLocalVoteValue(val, false);
			dispatch(
				setToast({
					type: val > 0 ? ToastType.UPVOTE : ToastType.DOWNVOTE,
					message: "Vote Changed",
					duration: 2000,
				}),
			);
			setOverlay(val > 0 ? OverlayType.UPVOTE : OverlayType.DOWNVOTE, 2000);
			return;
		}
		if (data.message === "VOTE_EXISTS") {
			dispatch(
				setToast({
					type: ToastType.ERROR,
					message: "Already Voted on that cat",
					duration: 2000,
				}),
			);
			setOverlay(OverlayType.WARNING, 3000);
			return;
		}
		dispatch(
			setToast({
				type: ToastType.ERROR,
				message: "Vote Failed",
				duration: 5000,
			}),
		);
		setOverlay(OverlayType.ERROR, 3000);
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

CardControls.defaultProps = {
	accountCatData: undefined,
};
