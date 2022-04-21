import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { useSelector } from "react-redux";
import { Button } from "../Styled/Components";
import { submitVote } from "../API/fetchData";
import { User } from "../state/store";

interface CatData {
	id: string;
	getNewCat: Function;
}

function CardControls({ id, getNewCat }: CatData) {
	const userData = useSelector(User);
	const handleVote = (val: number) => {
		if (id === (null || undefined) || val === (null || undefined)) {
			throw new Error(
				"Voting Requires 2 Parameters: image_id: string, voteValue: number",
			);
		}

		getNewCat();
		submitVote(id, val, userData.uuid);
	};

	return (
		<div>
			<Button>
				<ArrowUpwardIcon onClick={() => handleVote(1)} />
			</Button>
			<Button>
				<ArrowDownwardIcon onClick={() => handleVote(0)} />
			</Button>
		</div>
	);
}

export default CardControls;
