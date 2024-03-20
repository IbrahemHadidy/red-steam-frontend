import { FC, useState, ChangeEvent} from "react";
import useSoftNavigate from 'hooks/useSoftNavigate';
import gameData from "services/gameData";


const NavSearch: FC = () => {
	const navigate = useSoftNavigate();
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
            <a
              onClick={e => {
                navigate(`/search?term=${searchInput}`, e);
              }}
              className="search-button"
            >
              <img alt="Search" src="/images/blank.gif" />
            </a>
          </div>
        </form>
      </div>
      <div
        className="nav-search"
        style={{ display: searchInput !== '' ? 'block' : 'none' }}
      >
        <div className="search-popup">
          {gameData.slice(0, 11).map(game => (
            <a
              key={game.id}
              className="search-match"
              onClick={e => {
                navigate(`/game/${game.id}`, e);
              }}
            >
              <div className="match-name">{game.name}</div>
              <div className="match-img">
                <img src={game.searchImage} alt={game.name} />
              </div>
              <div className="match-price">
                {!game.free && '$'}
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
