import { createContext, useCallback, useContext, useState } from "react";
import OverlayType from "../Components/overlay/overlayTypes";

interface OverlayContextType {
	type: OverlayType;
	delay: number;
}

export const OverlayContext = createContext<OverlayContextType>({
	type: OverlayType.NONE,
	delay: 0,
});
export const setOverlayContext = createContext<Function>(() => {});

export const useOverlay = (): [OverlayContextType, Function] => {
	return [useContext(OverlayContext), useContext(setOverlayContext)];
};

export default function ContextHandler({ children }: any) {
	const [overlayData, setOverlayData] = useState({
		type: OverlayType.NONE,
		delay: 0,
	});

	const setOverlay = useCallback((type: OverlayType, delay: number) => {
		setTimeout(() => {
			setOverlayData({
				type: OverlayType.NONE,
				delay: 0,
			});
		}, delay);
		setOverlayData({
			type,
			delay,
		});
	}, []);

	return (
		<OverlayContext.Provider value={overlayData}>
			<setOverlayContext.Provider value={setOverlay}>
				{children}
			</setOverlayContext.Provider>
		</OverlayContext.Provider>
	);
}
