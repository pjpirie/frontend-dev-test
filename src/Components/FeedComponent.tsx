import ScheduleIcon from "@material-ui/icons/Schedule";

import ContextHandler from "../Context";
import { CatState } from "../state/slice/catSlice";
import { FeedCard } from "../Styled/Components";
import CardComponent from "./CardComponent";
import CardControls from "./CardControls";

interface CardProps {
	url: string;
	id: string;
	voteVal?: number;
	date?: Date;
	favID?: string;
	accountCatData?: {
		catData: CatState[];
		setCatData: Function;
	};
}
export default function FeedComponent(props: CardProps) {
	const { url, id, voteVal, date, favID, accountCatData } = props;
	const getController = () => {
		if (voteVal !== undefined && !Number.isNaN(voteVal)) {
			return (
				<CardControls
					id={id}
					voteVal={voteVal}
					accountCatData={accountCatData}
				/>
			);
		}
		if (date !== undefined) {
			return (
				<div className="FavData__Container">
					<ScheduleIcon />
					<h3>
						{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
					</h3>
				</div>
			);
		}
		return null;
	};

	return (
		<ContextHandler>
			<FeedCard key={id}>
				<CardComponent url={url} id={id} favID={favID} />
				{getController()}
			</FeedCard>
		</ContextHandler>
	);
}

FeedComponent.defaultProps = {
	voteVal: undefined,
	date: undefined,
	favID: undefined,
	accountCatData: undefined,
};
