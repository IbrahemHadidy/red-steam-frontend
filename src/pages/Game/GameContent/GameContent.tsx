import { FC } from "react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { gamesData } from "services/gameData";
import useResponsiveViewports from "hooks/useResponsiveViewports";
import "./GameContent.scss";

const GameContent: FC<{ game: gamesData }> = ({ game }) => {
	const isViewport630 = useResponsiveViewports(630);

	return (
		<div className="page-content">
			<RightContent 
			game={game}
			isViewport630={isViewport630}
			/>
			<LeftContent 
			game={game}
			isViewport630={isViewport630} 
			/>
		</div>
	);
};

export default GameContent;
