import styled from "@emotion/styled";

export const AppContainer = styled.div`
	padding: 2rem;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const AppHeader = styled.header`
	width: 100%;
	height: 10vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	margin-bottom: 2rem;
`;

export const AppMain = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
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

interface CatCardProps {
	image_url: string;
}

export const CatCard = styled.div<CatCardProps>`
	width: 300px;
	height: 400px;
	background: url(${(props) => props.image_url});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;
