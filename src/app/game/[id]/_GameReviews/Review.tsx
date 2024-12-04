// React
import { useEffect, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Sanitization library
import DOMPurify from 'dompurify';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';
import usePartialViewCheck from './hooks/usePartialViewCheck';

// Utils
import formatDate from '@utils/formatDate';

// Images
import defaultPFP from '@images/default-pfp.png';
import reviewIcon from '@images/icon_review_steam.png';
import negative from '@images/negative.png';
import positive from '@images/positive.png';

// Types
import type { Review } from '@interfaces/review';

interface ReviewProps {
  review: Review;
}

export default function Review({ review }: ReviewProps) {
  //--------------------------- Initializations ---------------------------//
  const isViewport630OrLess = useResponsiveViewport(630);

  //------------------------------- States --------------------------------//
  const [sanitizedContent, setSanitizedContent] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && review.content) {
      setSanitizedContent(DOMPurify.sanitize(review.content));
    }
  }, [review.content]);

  //-------------------------------- Hooks --------------------------------//
  const { isPartialView, setIsPartialView } = usePartialViewCheck();

  const handleReadMoreClick = (): void => {
    setIsPartialView((prev) => !prev);
  };

  //-------------------------------- Render -------------------------------//
  return (
    <div className={`review-box ${isPartialView ? 'partial' : ''}`} key={review.id}>
      <div className="leftcol">
        <div className="avatar">
          <Link href={`/user/${review.user?.id}`}>
            <div className={`player-avatar ${review.user?.isActive ? 'online' : 'offline'}`}>
              <img src={review.user?.profilePicture ?? defaultPFP.src} alt="pfp" />
            </div>
          </Link>
        </div>

        <div className="person-name">
          <Link href={`/user/${review.user?.id}`}>{review.user?.username}</Link>
        </div>

        {isViewport630OrLess && <div className="post-date"> Posted: {formatDate(review.date)}</div>}
      </div>

      <div className="rightcol">
        <div className="vote-header">
          <div className="thumb">
            <Image
              src={review.positive ? positive : negative}
              alt={review.positive ? 'positive' : 'negative'}
            />
          </div>

          <Image className="review-source" src={reviewIcon} alt="review source" />

          <div className="title">{!review.positive ? 'Not Recommended' : 'Recommended'}</div>
        </div>

        {!isViewport630OrLess && (
          <div className="post-date"> Posted: {formatDate(review.date)}</div>
        )}

        <div className="content">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />
          {isPartialView ? <div className="gradient" /> : ''}
        </div>

        {isPartialView && (
          <div className="posted">
            <div className="view-more">
              <a onClick={handleReadMoreClick}>Read More</a>
            </div>{' '}
            &nbsp;
            <div className="hr" />
          </div>
        )}
      </div>
    </div>
  );
}
