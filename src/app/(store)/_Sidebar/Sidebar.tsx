'use client';

// React
import { useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Redux Queries
import { useGetTagsQuery } from '@store/apis/user/interaction';

// Types
import type RecentGames from '@custom-types/recent-games';

interface LinkItem {
  to: string;
  text: string;
}

export default function Sidebar() {
  //------------------------------- States --------------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [recentGames, setRecentGames] = useState<RecentGames>([]);

  //--------------------------- Redux Selectors ---------------------------//
  const { data } = useGetTagsQuery();
  const yourTags = (data && data.tags) ?? [];

  //-------------------------- Utility Functions --------------------------//
  // Get recently viewed games

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRecentGames = JSON.parse(localStorage.getItem('recentGames') ?? '[]');
      setRecentGames(storedRecentGames);
    }
  }, []);

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

  //------------------------------- Render --------------------------------//
  return (
    <aside className="fixed-sidebar">
      <div className="sidebar">
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
