'use client';

// NextJS
import Image from 'next/image';

// Utils
import { getRatingClass, getRatingText } from '@utils/ratingUtils';

// Components
import FadingContainer from '@components/FadingContainer';

// Styles
import '@styles/components/HoverSummary.scss';

export interface HoverSummaryType {
  title: string;
  date: string;
  screenshots: string[];
  description: string;
  positivePercentage: number;
  totalReviews: number;
  tags: string[];
  leftArrow?: boolean;
  rightArrow?: boolean;
  isVisible: boolean;
}

export default function HoverSummary({
  title,
  date,
  screenshots,
  description,
  positivePercentage,
  totalReviews,
  tags,
  leftArrow,
  rightArrow,
  isVisible,
}: HoverSummaryType) {
  return (
    <FadingContainer isVisible={isVisible} className="game-hover">
      <div className="hover-box">
        <div className="hover-content">
          <h4 className="hover-title">{title}</h4>

          <span className="hover-release">{date}</span>

          {screenshots ? (
            <div className="hover-screenshots">
              {screenshots.map((screenshot, idx) => (
                <Image
                  className="hover-screenshot"
                  src={screenshot}
                  width={274}
                  height={153}
                  key={idx}
                  alt={`Screenshot ${idx + 1}`}
                />
              ))}
            </div>
          ) : (
            <p className="hover-description">{description}</p>
          )}

          <div className="hover-review-summary">
            <div className="hover-review-title">Overall user reviews:</div>

            <span className={`game-review-summary ${getRatingClass(positivePercentage)}`}>
              {getRatingText(positivePercentage, totalReviews)}
              &nbsp;
            </span>

            {totalReviews !== 0 && `(${totalReviews} reviews)`}
          </div>

          <div className="hover-tag-body">
            User tags: <br />
            <div className="hover-tag-row">
              {tags.slice(0, 7).map((tag, idx) => (
                <div className="game-tag" key={idx}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {leftArrow && <div className="hover-arrow-left" />}
      {rightArrow && <div className="hover-arrow-right" />}
    </FadingContainer>
  );
}
