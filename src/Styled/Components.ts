import styled from "@emotion/styled";

export const AppContainer = styled.div`
	padding: 2rem;
	width: 100vw;
	height: auto;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const AppHeader = styled.header`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 2rem;
	padding: 0 2rem;
`;

export const AppMain = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	max-height: 100vh;
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
`;

export const FeedCard = styled.div`
	box-shadow: 0 2px 0.5rem 0 rgba(0, 0, 0, 0.2);
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	height: fit-content;
`;

interface CatCardProps {
	image_url?: string;
}

export const CardControler = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	align-items: center;
	& h1 {
		padding: 0.5rem 1rem;
	}
`;

export const CatCard = styled.div<CatCardProps>`
	width: 300px;
	height: auto;
	display: flex;
	// background: url(${(props) => props.image_url});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	& img {
		width: 100%;
		border-radius: 0.5rem 0.5rem 0 0;
	}
	& .icon {
		position: absolute;
		top: 20px;
		right: 20px;
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
