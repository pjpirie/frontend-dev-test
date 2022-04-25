import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import BlockIcon from "@material-ui/icons/Block";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useOverlay } from "../../Context/index";
import { OverlayContainer } from "../../Styled/Components";
import OverlayType from "./overlayTypes";

const getOverlayData = (data: OverlayType) => {
	switch (data) {
		case OverlayType.FAVOURITE:
			return { icon: <FavoriteIcon />, color: "active pink" };
		case OverlayType.ERROR:
			return { icon: <CloseIcon />, color: "active red" };
		case OverlayType.WARNING:
			return { icon: <BlockIcon />, color: "active yellow" };
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
