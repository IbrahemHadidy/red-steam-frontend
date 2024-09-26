'use client';

// React
import { useContext, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { getTags } from '@services/common/tags';

// Images
import steamPromoCard from '@images/steamcards_promo_03.png';

// Types
import type { Tag } from '@entities/tag.entity';
import type { FC, JSX, MouseEvent } from 'react';
import type { LinkItem } from '../Store.types';

const Sidebar: FC = (): JSX.Element => {
  // Contexts
  const { isLoggedIn, userData } = useContext(AuthContext);
  const [yourTags, setYourTags] = useState<Tag[]>([]);

  // Get user tags
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserTags = async (): Promise<void> => {
        const fetchedTags = await getTags(userData?.tags.map((tag) => tag.id) || []);
        setYourTags(fetchedTags);
      };

      fetchUserTags();
    }
  }, [isLoggedIn, userData?.tags]);

  // Get recently viewed games
  const recentGames: { id: number; name: string; timestamp: number }[] = JSON.parse(
    localStorage.getItem('recentGames') || '[]'
  );

  // Helper function to generate links
  const generateLinks = (links: LinkItem[]): JSX.Element[] => {
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

  const handleItemClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    toast.info('Coming Soon!');
  };

  return (
    <div className="fixed-sidebar">
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

        {isLoggedIn && recentlyViewedLinks.length > 0 && (
          <div className="recents" id="hom-elj">
            <div className="header">Recently Viewed</div>
            <div>{generateLinks(recentlyViewedLinks)}</div>
          </div>
        )}

        {isLoggedIn && (
          <div>
            <div className="header tag">Your Tags</div>
            <div>{generateLinks(tagsLinks)}</div>
          </div>
        )}
        {/* Browse Categories section */}
        <div>
          <div className="header">Browse Categories</div>
          <div>{generateLinks(categoryLinks)}</div>
        </div>

        <div>
          <div className="header">Browse by genre</div>
          {generateLinks(genreLinks)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
