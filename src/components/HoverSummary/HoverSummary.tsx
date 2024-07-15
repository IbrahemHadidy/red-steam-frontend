'use client';

// Next.js
import Image from 'next/image';

// React Spring
import { animated, useSpring } from 'react-spring';

// Utils
import { getRatingClass, getRatingText } from 'utils/ratingUtils';

// Styles
import './HoverSummary.scss';

// Types
import type { FC } from 'react';
import type { HoverSummary } from './HoverSummary.types';

const HoverSummary: FC<HoverSummary> = ({
  title,
  date,
  screenshots,
  description,
  positivePercentage,
  totalReviews,
  tags,
  leftArrow,
  rightArrow,
}) => {
  const fadeEffect = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 280 },
  });

  const ratingClass = getRatingClass(positivePercentage);

  return (
    <animated.div className="game-hover" style={fadeEffect}>
      <div className="hover-box">
        <div className="hover-content">
          <h4 className="hover-title">{title}</h4>
          <span className="hover-release">{date}</span>
          {screenshots ? (
            <div className="hover-screenshots">
              {screenshots.map((screenshot, index) => (
                <Image
                  className="hover-screenshot"
                  src={screenshot}
                  width={274}
                  height={153}
                  key={index}
                  alt={`Screenshot ${index + 1}`}
                />
              ))}
            </div>
          ) : (
            <p className="hover-description">{description}</p>
          )}
          <div className="hover-review-summary">
            <div className="hover-review-title">Overall user reviews:</div>
            <span className={`game-review-summary ${ratingClass}`}>
              {getRatingText(positivePercentage)}
              &nbsp;
            </span>
            {totalReviews !== 0 && `(${totalReviews} reviews)`}
          </div>
          <div className="hover-tag-body">
            User tags: <br />
            <div className="hover-tag-row">
              {tags.slice(0, 7).map((tag, index) => (
                <div className="game-tag" key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {leftArrow && <div className="hover-arrow-left" />}
      {rightArrow && <div className="hover-arrow-right" />}
    </animated.div>
  );
};

export default HoverSummary;
