'use client';

// NextJS
import Link from 'next/link';

// Utils
import { getHoverInfo, getRatingClass, getRatingText } from '@utils/ratingUtils';

// Types
import type { FC, JSX } from 'react';
import type { RightSectionProps } from '../Store.types';

const RightSection: FC<RightSectionProps> = ({ game }): JSX.Element => {
  return (
    <div className="tab-right">
      {game && (
        <div className="tab-right-content">
          <div className="tab-preview">
            <>
              <h2>{game.name}</h2>
              <div className="tab-review-summary">
                <div className="review-title">Overall user reviews:</div>
                <span className={`game-review-summary ${getRatingClass(game.averageRating)}`}>
                  {getRatingText(game.averageRating, game.reviewsCount)}
                </span>
                <span>&nbsp;({game.reviewsCount})</span>
                <span className="review-tooltip">
                  {getHoverInfo(game.averageRating, game.reviewsCount)}
                </span>
              </div>
              <div className="tab-tags">
                {game.tags?.map((tag, idx) => (
                  <Link className="tab-tag" key={idx} href={`/search?tags=${tag.id}`}>
                    {tag.name}
                  </Link>
                ))}
              </div>
              <div className="tabs-screenshots">
                {game.imageEntries
                  .filter((screenshot) => screenshot.featured)
                  .map((screenshot) => (
                    <div
                      className="tabs-screenshot"
                      style={{ backgroundImage: `url(${screenshot.link})` }}
                      key={screenshot.link}
                    ></div>
                  ))}
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSection;
