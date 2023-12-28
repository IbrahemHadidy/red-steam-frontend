import { FC, useState, ChangeEvent} from "react";
import gameData from "../../pages/Game/gameData";


const NavSearch: FC = () => {
	const [searchInput, setSearchInput] = useState("");

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	}

	// TODO: send searchInput to backend then fetch the requested data 
	// make the backend send 10 games at a time for every change


	return (
		<div className="search-area">
			<div id="search">
				<form>
					<input type="hidden" />
					<div className="search">
						<input
							name="term"
							type="text"
							className="search-input"
							autoComplete="off"
							placeholder="search"
							onChange={handleSearchChange}
						/>
						<a href={`/search?term=${searchInput}`} className="search-button">
							<img alt="Search" src="/images/blank.gif" />
						</a>
					</div>
				</form>
			</div>
			<div className="nav-search" style={{ display: searchInput !== "" ? "block" : "none" }}>
				<div className="search-popup">
					{gameData.slice(0, 11).map((game) => (
						<a key={game.id}  className="search-match" href={`/game/${game.id}`}>
							<div className="match-name">{game.name}</div>
							<div className="match-img">
								<img src={game.searchImage} alt={game.name} />
							</div>
							<div className="match-price">
								{game.discountPrice ? game.discountPrice : game.price}
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default NavSearch;
