import { OverlayContainer } from "../Styled/Components";

interface OverlayProps {
	Icon: React.FunctionComponent;
	isActive: boolean;
}

export default function Overlay(props: OverlayProps) {
	const { Icon, isActive } = props;

	return (
		<OverlayContainer className={isActive ? "active" : ""}>
			<Icon />
		</OverlayContainer>
	);
}
