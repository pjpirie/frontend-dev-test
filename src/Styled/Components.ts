import styled from "@emotion/styled";

export const AppContainer = styled.div`
	padding: 2rem 0;
	width: 100vw;
	height: auto;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	@media (max-width: 640px) {
		padding-bottom: 0;
	}
`;

export const AppHeader = styled.header`
	position: sticky;
	top: 0rem;
	box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
	z-index: 990;
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 2rem;
	padding: 0 2rem;
	background: #ffffff;

	button.reset {
		padding: 1rem;
		height: 100%;

		svg {
			color: #1f1f1f;
		}
	}

	@media (max-width: 640px) {
		position: sticky;
		height: 6vh;
		top: 94vh;
		width: calc(100vw - 4rem);
		padding: 0;
		background: #ffffff;
		border: 2px solid #eaeaea;
		margin: 0 auto;
		border-radius: 0.5rem 0.5rem 0 0;
		box-shadow: none;
	}
`;

export const AppMain = styled.main`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	width: 100%;
	height: auto;
	min-height: 80vh;
	position: relative;
	padding: 0 2rem;
	grid-gap: 2rem;
	margin: 0 auto;
	@media (max-width: 640px) {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}
`;

export const Button = styled.button`
	padding: 0.5rem 1rem;
	color: #1f1f1f;
	background-color: rgbA(255, 255, 255, 0);
	border: none;
	border-radius: 0.5rem;
	margin: 1rem 0;
	&:hover {
		background-color: #e1e1e1;
		cursor: pointer;
	}

	&.reset {
		padding: 0;
		margin: 0;
	}
`;

export const FeedCard = styled.div`
	box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1);
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	height: 400px;
	width: 20%;
	min-width: 300px;
	@media (max-width: 640px) {
		width: auto;
		height: fit-content;
	}

	& .FavData__Container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 14%;
		padding: 0.5rem;
	}
`;

interface CatCardProps {
	image_url?: string;
}

export const CardControler = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	align-items: center;
	min-height: fit-content;
	height: 30%;
	& h1 {
		padding: 0.5rem 1rem;
	}
	@media (max-width: 640px) {
		height: auto;
	}
`;

export const CatCard = styled.div<CatCardProps>`
	display: flex;
	position: relative;
	width: 100%;
	height: 70%;
	border-radius: 0.5rem 0.5rem 0 0;
	overflow: hidden;
	@media (max-width: 640px) {
		width: 300px;
		height: auto;
	}
	& img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		@media (max-width: 640px) {
			width: 100%;
			height: auto;
		}
	}
	&.fav {
		height: 86%;
	}
	& .icon {
		height: 2rem;
		width: 2rem;
		position: absolute;
		cursor: pointer;
		top: 5px;
		right: 5px;
		padding: 0.3rem;
		border-radius: 50px;
		transition: background 0.3s ease-in-out;
		&:hover {
			background: rgba(255, 50, 30, 0.5);
		}

		&.red {
			color: #ff5030;
		}
	}
`;

export const FavList = styled.ul`
	display: flex;
	flex-direction: column;
	max-width: 300px;
`;

export const Favitem = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 100%;
	max-height: 100%;
	margin: 0.5rem 0;
	position: relative;

	& img {
		border-radius: 10px 10px 0 0;
		width: 100%;
	}

	& .FavData__Container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0.5rem;
		background-color: #f5f5f5;
		border-radius: 0 0 10px 10px;
		border-top: 5px solid #ffd1bd;
	}
`;

// Toast Component

export const ToastContainer = styled.div`
	z-index: 9999;
	position: absolute;
	width: 100%;
	height: 100%;
	transform: scaleX(0);
	opacity: 0;
	transition: all 0.5s ease-in-out;
	transform-origin: right;

	&.active {
		transform: scaleX(1);
		opacity: 1;
	}
`;

export const Toast = styled.div`
	display: flex;
	position: sticky;
	margin-left: auto;
	top: 2rem;
	height: auto;
	max-width: 340px;
	width: 100%;
	flex-direction: column;
	background: #ffffff;
	border-radius: 0.5rem;
	box-shadow: 0 2px 0.5rem 0 rgba(0, 0, 0, 0.2);
	padding: 1rem;
	& .toast-header {
		display: flex;
		justify-content: space-between;
		font-size: 1.2rem;
		margin-bottom: 0.5rem;

		& .red {
			color: #f45e55;
		}

		& .green {
			color: #88f555;
		}

		& .blue {
			color: #8379f9;
		}
	}
`;

// Overlay Component

export const OverlayContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 200ms ease-in-out;
	// transform: scaleX(0);
	transform-origin: center;
	backdrop-filter: blur(0px);
	opacity: 0;
	&.active {
		background: rgba(244, 94, 85, 0.2);
		backdrop-filter: blur(5px);
		transform: scale(1);
		opacity: 1;
		& svg {
			animation: heart 500ms linear forwards;
		}
	}
	& svg {
		opacity: 0;
		color: #f45e55;
	}
`;
