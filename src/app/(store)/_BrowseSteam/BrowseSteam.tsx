'use client';

// React
import { useContext } from 'react';

// NextJS
import Link from 'next/link';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Types
import type { JSX } from 'react';

export default function BrowseSteam(): JSX.Element {
  // Contexts
  const { userData } = useContext(AuthContext);

  const userTags: string =
    (userData?.tags && userData.tags.length > 0 && userData.tags.map((tag) => tag.id).join(',')) ||
    '';

  return (
    <div className="home-section">
      <div className="home-contents">
        <div className="big-buttons">
          <div className="home-titles" style={{ marginBottom: '10px' }}>
            Browse Steam
          </div>
          <div className="browse-buttons">
            <Link className="big-button" href="/search?sort=Release%20Date&price=Any%20Price">
              {' '}
              New Releases{' '}
            </Link>
            <Link className="big-button" href="/search?priceOptions=Special%20Offers">
              {' '}
              Specials{' '}
            </Link>
            <Link className="big-button" href="/search?price=Free">
              {' '}
              Free Games{' '}
            </Link>
            <Link className="big-button" href={`/search?tags=${userTags}`}>
              {' '}
              By User Tags{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
