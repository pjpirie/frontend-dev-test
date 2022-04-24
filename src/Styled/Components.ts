import styled from "@emotion/styled";

/**
 * App Wrapper Component
 * @child: AppContainer<div>
 * */
export const AppContainer = styled.div`
	padding-bottom: 2rem;
	width: 100vw;
	height: auto;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #f2f8fa;
	@media (max-width: 640px) {
		padding-bottom: 0;
	}
`;

/**
 * Header/Navigation Content Container Component
 * @child: AppHeader<header>
 * */
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
	padding: 1rem 2rem;
	background: #b1c5cc;
	& a {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button.reset {
		padding: 1rem;
		height: 100%;

		svg {
			color: #1f1f1f;
		}
	}

	@media (max-width: 640px) {
		position: fixed;
		height: fit-content;
		bottom: 0%;
		width: 100vw
		padding: 0.5rem 1rem;
		margin: auto 0 0;
		border-radius: 0.5rem 0.5rem 0 0;
		box-shadow: none;
	}
`;

/**
 * Main Content Container Component
 * @child: AppMain<main>
 * */
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
		padding: 1rem 2rem 10vh;
	}
`;

/**
 * Button Component
 * @child: Button<button>
 * */
export const Button = styled.button`
	padding: 0.5rem;
	color: #1f1f1f;
	background-color: rgbA(255, 255, 255, 0);
	border: none;
	border-radius: 50px;
	margin: 1rem 0;
	background-color: #ffffff;
	transition: background 0.2s ease-in-out;
	display: flex;
	justify-content: center;
	align-items: center;
	&.active {
		background-color: #5d686b;

		& svg {
			fill: #ffffff;
		}
	}
	&:hover {
		background-color: #5d686b;
		cursor: pointer;
	}

	&.reset {
		padding: 0;
		margin: 0;
	}
`;
/**
 * Feed Component
 * @child: FeedCard<div>
 * @child: CardControler<div>
 * @child: CatCard<img>
 * */

export const FeedCard = styled.div`
	box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1);
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	height: 400px;
	width: 20%;
	min-width: 300px;
	@media (max-width: 640px) {
		width: auto;
	}

	@media (max-width: 380px) {
		min-width: 90%;
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

/**
 * Toast Component
 * @child: ToastContainer<div>
 * @child: Toast<div>
 * */

export const ToastContainer = styled.div`
	z-index: 9999;
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 0 1rem;
	right: 0;
	max-width: 340px;
	transform: scaleX(0);
	opacity: 0;
	transition: all 0.5s ease-in-out;
	transform-origin: right;
	pointer-events: none;

	&.active {
		transform: scaleX(1);
		opacity: 1;
	}
`;

export const Toast = styled.div`
	display: flex;
	position: sticky;
	margin-left: auto;
	top: 11vh;
	height: auto;
	width: 100%;
	flex-direction: column;
	background: #ffffff;
	border-radius: 0.5rem;
	box-shadow: 0 2px 0.5rem 0 rgba(0, 0, 0, 0.2);
	padding: 1rem;
	pointer-events: all;

	& button {
		padding: 0.25rem;
		margin: 0px;
		&:hover {
			color: #ffffff;
		}
	}

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

/**
 * Overlay Component
 * @child: OverlayContainer<div>
 * */

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
		&.red {
			background: rgba(244, 94, 85, 0.2);
			& svg {
				fill: rgba(244, 94, 85, 1);
			}
		}
		&.green {
			background: rgba(136, 245, 85, 0.2);
			& svg {
				fill: rgba(136, 245, 85, 1);
			}
		}
		&.blue {
			background: rgba(131, 121, 249, 0.2);
			& svg {
				fill: rgba(131, 121, 249, 1);
			}
		}
		&.pink {
			background: rgba(250, 144, 195, 0.2);
			& svg {
				fill: rgba(250, 144, 195, 1);
			}
		}
		&.yellow {
			background: rgba(250, 245, 144, 0.2);
			& svg {
				fill: rgba(250, 245, 144, 1);
			}
		}
		backdrop-filter: blur(5px);
		transform: scale(1);
		opacity: 1;
		& svg {
			animation: pulse 500ms linear forwards;
		}
	}
	& svg {
		opacity: 0;
		color: #000000;
	}
`;

/**
 * Scrollbar Component
 * @child: ScrollbarContainer<div>
 * */

export const ScrollbarContainer = styled.div`
	display: none;
	position: fixed;
	width: 4px;
	height: 100%;
	top: 0;
	right: 0;
	z-index: 980;
	background: rgba(0, 0, 0, 0.05);

	@media (min-width: 640px) {
		bottom: 0;
		top: unset;
	}

	#scrollbar {
		position: absolute;
		width: 4px;
		height: 50px;
		top: 0;
		right: 0;
		animation: rainbow 10s linear infinite;
		background: linear-gradient(to top, #008aff, #00ffe7);
		border-radius: 50px 0 0 50px;
		z-index: 981;
	}
`;
