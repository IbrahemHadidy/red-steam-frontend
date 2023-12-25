import { FC } from 'react';

interface GameTitleAreaProps {
	category: string;
	name: string;
}

export const GameTitleArea: FC<GameTitleAreaProps> = ({ category, name }) => {
	return (
		<div className="game-title-area">
			<div className="genre-block">
				<a href="/search/">
					<span className="genre-item">All Games</span>
				</a>{" "}
				&gt;{" "}
				<a href={`/genre/${category}/`}>
					<span className="genre-item">{category}</span>
				</a>{" "}
				&gt;{" "}
				<a href={`/game/${name}/`}>
					<span className="genre-item">{name}</span>
				</a>
			</div>
			<div className="game-header-content">
				<div className="game-community">
					<a className="community-btn" href="">
						<span>Community Hub</span>
					</a>
				</div>
				<div className="main-game-name">{name}</div>
			</div>
		</div>
	);
};