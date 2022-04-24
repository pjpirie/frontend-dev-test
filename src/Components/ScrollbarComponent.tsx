import { useEffect, useRef } from "react";
import { ScrollbarContainer } from "../Styled/Components";

export default function CustomScrollbar() {
	const scrollbarRef = useRef<any>(null);

	useEffect(() => {
		// Setup
		// Calculate the height of the scrollable document outside the viewport
		let totalHeight = Math.floor(
			document.body.scrollHeight - window.innerHeight,
		);
		// Get Scrollbar element
		const scrollbarElement = scrollbarRef.current;

		const resizeEvent = () => {
			totalHeight = document.body.scrollHeight - window.innerHeight;
		};
		const scrollEvent = () => {
			// Get DOM elements
			const headerEl: any = document.querySelector("#headerComponent");
			const scrollContainerEl: any = document.querySelector("#scrollContainer");

			// Calculate the height of the scrollable document outside the viewport
			totalHeight = document.body.scrollHeight - window.innerHeight;

			// Set the scroll container to 100% - the height of the header element
			if (headerEl && scrollContainerEl) {
				scrollContainerEl.style.height = `${
					window.innerHeight - headerEl.offsetHeight
				}px`;
			}
			if (scrollbarElement) {
				// Calculate the percentage of the document scrolled
				const posPercent = Math.floor(
					(window.pageYOffset + totalHeight) / (totalHeight / 100) - 100,
				);

				// Convert the percentage to a pixel value, based on the height of the scollbar container
				const posPixel = Math.floor(
					(window.innerHeight - headerEl.offsetHeight) * (posPercent / 100),
				);

				// Additional Styling based on the scrollbar location
				if (posPercent < 10) scrollbarElement.style = `top: ${posPixel}px`;
				if (posPercent >= 10)
					scrollbarElement.style = `top: ${
						posPixel - scrollbarElement.offsetHeight
					}px`;
				if (posPercent > 99)
					scrollbarElement.style.borderRadius = "50px 0px 0px 0px";
				if (posPercent < 1)
					scrollbarElement.style.borderRadius = "0px 0px 0px 50px";
			}
		};

		window.addEventListener("resize", resizeEvent);
		window.addEventListener("scroll", scrollEvent);

		// Teardown
		return () => {
			window.removeEventListener("resize", resizeEvent);
			window.removeEventListener("scroll", scrollEvent);
		};
	}, []);

	return (
		<ScrollbarContainer id="scrollContainer">
			<div ref={scrollbarRef} id="scrollbar" />;
		</ScrollbarContainer>
	);
}
