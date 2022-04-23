import ScheduleIcon from "@material-ui/icons/Schedule";
import { FeedCard } from "../Styled/Components";
import CardComponent from "./CardComponent";
import CardControls from "./CardControls";

interface CardProps {
	url: string;
	id: string;
	voteVal?: number;
	date?: Date;
}

export default function FeedComponent(props: CardProps) {
	const { url, id, voteVal, date } = props;
	console.log(props);
	return (
		<FeedCard key={id}>
			<CardComponent url={url} id={id} />
			{voteVal === undefined ? null : (
				<CardControls id={id} voteVal={voteVal} />
			)}
			{date === undefined ? null : (
				<div className="FavData__Container">
					<ScheduleIcon />
					<h3>
						{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
					</h3>
				</div>
			)}
		</FeedCard>
	);
}

FeedComponent.defaultProps = {
	voteVal: undefined,
	date: undefined,
};
