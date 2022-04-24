import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { OverlayContainer } from "../../Styled/Components";
import OverlayType from "./overlayTypes";
import { useOverlay } from "../../Context/index";

const getOverlayData = (data: OverlayType) => {
	switch (data) {
		case OverlayType.FAVOURITE:
			return { icon: <FavoriteIcon />, color: "active pink" };
		case OverlayType.UPVOTE:
			return { icon: <ArrowUpwardIcon />, color: "active green" };
		case OverlayType.DOWNVOTE:
			return { icon: <ArrowDownwardIcon />, color: "active red" };
		default:
			return { icon: "", color: "" };
	}
};

export default function Overlay() {
	const [overlay] = useOverlay();
	return (
		<OverlayContainer className={getOverlayData(overlay.type).color}>
			{getOverlayData(overlay.type).icon}
		</OverlayContainer>
	);
}
