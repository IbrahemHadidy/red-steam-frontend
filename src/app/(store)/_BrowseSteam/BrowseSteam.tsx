'use client';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function BrowseSteam() {
  //--------------------------- Initializations ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);

  const userTags: string =
    (currentUserData?.tags &&
      currentUserData?.tags.length > 0 &&
      currentUserData?.tags.map((tag) => tag.id).join(',')) ||
    '';

  //-------------------------- Render UI Section --------------------------//
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
