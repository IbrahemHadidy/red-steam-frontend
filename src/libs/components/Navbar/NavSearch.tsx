// React
import { useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// APIs
import { useSearchQuery } from '@store/apis/game/data';

// Images
import blank from '@images/blank.gif';

// Types
import type { ChangeEvent } from 'react';

export default function NavSearch() {
  //------------------------------- States --------------------------------//
  const [searchInput, setSearchInput] = useState<string>('');

  //------------------------------ API Calls ------------------------------//
  const { data: gameData } = useSearchQuery(searchInput);

  //---------------------------- Event Handlers ---------------------------//
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  //-------------------------------- Render -------------------------------//
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

            <Link href={`/search?term=${searchInput}`} className="search-button">
              <Image alt="Search" src={blank} />
            </Link>
          </div>
        </form>
      </div>

      <div className="nav-search" style={{ display: searchInput !== '' ? 'block' : 'none' }}>
        <div className="search-popup">
          {gameData?.slice(0, 11).map((game) => (
            <Link key={game.id} className="search-match" href={`/game/${game.id}`}>
              <div className="match-name">{game.name}</div>

              <div className="match-img">
                <Image
                  width={120}
                  height={45}
                  src={game.thumbnailEntries.searchImage}
                  alt={game.name}
                />
              </div>

              <div className="match-price">
                {game.pricing?.free
                  ? 'Free to Play'
                  : game.pricing?.discountPrice
                    ? `$${game.pricing?.discountPrice}`
                    : `$${game.pricing?.basePrice}`}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
