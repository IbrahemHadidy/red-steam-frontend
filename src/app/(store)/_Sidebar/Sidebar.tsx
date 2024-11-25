'use client';

// NextJS
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Redux Queries
import { useGetTagsQuery } from '@store/apis/user/interaction';

// Images
import steamPromoCard from '@images/steamcards_promo_03.png';

// Types
import type RecentGames from '@custom-types/recent-games';
import type { MouseEvent } from 'react';

interface LinkItem {
  to: string;
  text: string;
}

export default function Sidebar() {
  //--------------------------- Initializations ---------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  //--------------------------- Redux Selectors ---------------------------//
  const { data } = useGetTagsQuery();
  const yourTags = (data && data.tags) ?? [];

  //-------------------------- Utility Functions --------------------------//
  // Get recently viewed games
  const recentGames: RecentGames =
    typeof window !== 'undefined'
      ? (JSON.parse(localStorage.getItem('recentGames') ?? '[]') ?? [])
      : [];

  // Helper function to generate links
  const generateLinks = (links: LinkItem[]) => {
    return links.map((link, idx) => (
      <Link key={idx} className="item" href={link.to}>
        {link.text}
      </Link>
    ));
  };

  // Recently viewed Games
  const recentlyViewedLinks: LinkItem[] = recentGames
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)
    .map((game) => ({
      to: `/game/${game.id}`,
      text: game.name,
    }));

  const tagsLinks: LinkItem[] = yourTags.slice(0, 5).map((tag) => ({
    to: `/search?tags=${tag.id}`,
    text: tag.name,
  }));

  const categoryLinks: LinkItem[] = [
    { to: '/search?sort=Top%20Sales', text: 'Top Sellers' },
    { to: '/search?sort=Release%20Date&preferenceOptions=7', text: 'New Releases' },
    { to: '/search?sort=Release%20Date', text: 'Upcoming' },
    { to: '/search?priceOptions=1', text: 'Specials' },
  ];

  const genreLinks: LinkItem[] = [
    { to: '/search?tags=32', text: 'Free to Play' },
    { to: '/search?tags=8', text: 'Action' },
    { to: '/search?tags=30', text: 'Adventure' },
    { to: '/search?tags=49', text: 'Casual' },
    { to: '/search?tags=50', text: 'Indie' },
    { to: '/search?tags=25', text: 'Massively Multiplayer' },
    { to: '/search?tags=51', text: 'Racing' },
    { to: '/search?tags=35', text: 'RPG' },
    { to: '/search?tags=19', text: 'Simulation' },
    { to: '/search?tags=52', text: 'Sports' },
    { to: '/search?tags=13', text: 'Strategy' },
  ];

  //--------------------------- Event Handlers ----------------------------//
  const handleItemClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    toast.info('Coming Soon!');
  };

  //------------------------------- Render --------------------------------//
  return (
    <aside className="fixed-sidebar">
      <div className="sidebar">
        <div>
          <a className="item" onClick={handleItemClick}>
            <div className="gift-card">
              <img className="image" src={steamPromoCard.src} alt="Steam Gift Cards" />{' '}
              <h6 className="gift-card-h6">Steam Gift Cards</h6>
              <p className="gift-card-p">Give the Gift of Game</p>
            </div>
          </a>
        </div>

        {isUserLoggedIn && recentlyViewedLinks.length > 0 && (
          <div className="recents" id="hom-elj">
            <div className="header">Recently Viewed</div>
            <div>{generateLinks(recentlyViewedLinks)}</div>
          </div>
        )}

        {isUserLoggedIn && tagsLinks.length > 0 && (
          <div>
            <div className="header tag">Your Tags</div>
            <div>{generateLinks(tagsLinks)}</div>
          </div>
        )}

        <div>
          <div className="header">Browse Categories</div>
          <div>{generateLinks(categoryLinks)}</div>
        </div>

        <div>
          <div className="header">Browse by genre</div>
          {generateLinks(genreLinks)}
        </div>
      </div>
    </aside>
  );
}
