//!! TODO: CHANGE THE TAGS AND GENRES TO AVAILABLE TAGS/SORT OPTIONS USED IN THE SITE

'use client';

// React
import { useContext } from 'react';

// NextJS
import Link from 'next/link';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Bootstrap components
import { Nav } from 'react-bootstrap';

// Toast notifications
import { toast } from 'react-toastify';

// Images
import steamPromoCard from '@images/steamcards_promo_03.png';

// Types
import type { FC, JSX, MouseEvent } from 'react';
import type { LinkItem } from '../Store.types';

const Sidebar: FC = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);

  // Helper function to generate links
  const generateLinks = (links: LinkItem[]): JSX.Element[] => {
    return links.map((link, idx) => (
      <Link key={idx} className="item" href={link.to}>
        {link.text}
      </Link>
    ));
  };

  // TODO: Backend logic, render recently viewed games, max 5 latest viewed games, remove them from database after 4 days
  const recentlyViewedLinks: LinkItem[] = [
    // Define recently viewed game links
    { to: '/game/PUBG_BATTLEGROUNDS', text: 'PUBG: BATTLEGROUNDS' },
    { to: '/game/NARAKA_BLADEPOINT', text: 'NARAKA: BLADEPOINT' },
    { to: '/game/Call_of_Duty', text: 'Call of Duty®' },
  ];

  // TODO: Backend logic, render tags dynamically depending on user's tags selection (most 5 tags having games)
  const tagsLinks: LinkItem[] = [
    // Define tag links
    { to: '/tags/en/Mod/', text: 'Mod' },
    {
      to: '/tags/en/Dark%20Fantasy/',
      text: 'Dark Fantasy',
    },
    {
      to: '/tags/en/Psychological/',
      text: 'Psychological',
    },
    {
      to: '/tags/en/Open%20World/',
      text: 'Open World',
    },
    { to: '/tags/en/Fantasy/', text: 'Fantasy' },
  ];

  // TODO: Backend logic, conditional redirection
  const recommendedLinks: LinkItem[] = [
    // Define recommended links
    // TODO: Not working link need to add code for handling friend activity
    {
      to: isLoggedIn ? '/recommended/friendactivity/' : '/login',
      text: 'By Friends',
    },
    { to: isLoggedIn ? '/tag/browse/#yours' : '/login', text: 'Tags' },
  ];

  const categoryLinks: LinkItem[] = [
    // Define category links
    { to: '/category/topsellers', text: 'Top Sellers' },
    { to: '/category/new', text: 'New Releases' },
    { to: '/category/upcoming', text: 'Upcoming' },
    { to: '/category/specials', text: 'Specials' },
    { to: '/category/vr', text: 'VR Titles' },
    { to: '/category/controller-friendly', text: 'Controller-Friendly' },
    { to: '/category/greatondeck', text: 'Great on Deck' },
  ];

  const genreLinks: LinkItem[] = [
    // Define genre links
    { to: '/genre/free-to-play', text: 'Free to Play' },
    { to: '/genre/early-access', text: 'Early Access' },
    { to: '/genre/action', text: 'Action' },
    { to: '/genre/adventure', text: 'Adventure' },
    { to: '/genre/casual', text: 'Casual' },
    { to: '/genre/indie', text: 'Indie' },
    { to: '/genre/massively-multiplayer', text: 'Massively Multiplayer' },
    { to: '/genre/racing', text: 'Racing' },
    { to: '/genre/rpg', text: 'RPG' },
    { to: '/genre/simulation', text: 'Simulation' },
    { to: '/genre/sports', text: 'Sports' },
    { to: '/genre/strategy', text: 'Strategy' },
  ];

  const handleItemClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    toast.info('Coming Soon!');
  };

  return (
    <div className="fixed-sidebar">
      <Nav className="sidebar">
        {/* Steam Gift Cards section */}
        <div>
          <a className="item" onClick={handleItemClick}>
            <div className="gift-card">
              <img className="image" src={steamPromoCard.src} alt="Steam Gift Cards" />{' '}
              <h6 className="gift-card-h6">Steam Gift Cards</h6>
              <p className="gift-card-p">Give the Gift of Game</p>
            </div>
          </a>
        </div>

        {/* Recently Viewed section */}
        <div className="recents" id="hom-elj">
          <div className="header">Recently Viewed</div>
          <div>{generateLinks(recentlyViewedLinks)}</div>
        </div>

        {/* Your Tags section */}
        {isLoggedIn && (
          <div>
            <div className="header tag">Your Tags</div>
            <div>{generateLinks(tagsLinks)}</div>
          </div>
        )}

        {/* Recommended section */}
        <div>
          <div className="header">Recommended</div>
          <div>{generateLinks(recommendedLinks)}</div>
        </div>

        {/* Browse Categories section */}
        <div>
          <div className="header">Browse Categories</div>
          <div>{generateLinks(categoryLinks)}</div>
        </div>

        {/* Browse by Genre section */}
        <div>
          <div className="header">Browse by genre</div>
          {generateLinks(genreLinks)}
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
