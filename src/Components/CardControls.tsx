import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useSelector, useDispatch } from "react-redux";
import { Button, CardControler } from "../Styled/Components";
import { submitVote } from "../API/votes";
import { User } from "../state/store";
import { removeCat } from "../state/slice/catSlice";

interface ControlProps {
	id: string;
	voteVal: number;
	// loading: { isLoading: boolean; setLoading: Function };
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

		// getNewCat();
		await submitVote(id, val, userData.uuid);
		dispatch(removeCat(id));
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
