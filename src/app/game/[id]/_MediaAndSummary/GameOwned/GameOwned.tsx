'use client';

// React
import { useEffect, useState, type JSX } from 'react';

// NextJS
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Images
import defaultPFP from '@images/default-pfp.png';

// Types
import { hasReviewedGame, reviewGame, updateReview } from '@services/user/interaction';
import type { ChangeEvent, MouseEvent } from 'react';
import type { GameOwnedProps } from '../MediaAndSummary.types';

export default function GameOwned({ game }: GameOwnedProps): JSX.Element {
  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [positive, setPositive] = useState<boolean | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkReview = async (): Promise<void> => {
      const hasReviewed = await hasReviewedGame(game.id);
      if (hasReviewed.reviewed) {
        setHasReviewed(true);
        setPositive(hasReviewed.review.positive);
        setContent(hasReviewed.review.content);
        setReviewId(hasReviewed.review.id);
      } else {
        setHasReviewed(false);
      }
    };

    checkReview();
  }, [currentUserData, game.id]);

  useEffect(() => {
    if (content === '' || positive === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [content, positive]);

  const handleFormattingHelpClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.open(
      'https://www.w3schools.com/html/html_formatting.asp',
      'formattinghelp',
      'height=640,width=640,resize=yes,scrollbars=yes'
    );
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const handleThumbsUpClick = (): void => {
    setPositive(true);
  };

  const handleThumbsDownClick = (): void => {
    setPositive(false);
  };

  const handleReviewSubmit = async (): Promise<void> => {
    if (content === '') {
      toast.error('Please write a review before submitting');
      return Promise.reject();
    }
    if (positive === null) {
      toast.error('Please select a rating before submitting');
      return Promise.reject();
    }
    if (!hasReviewed) {
      await reviewGame(game.id, positive, content);
    } else {
      reviewId && (await updateReview(reviewId, positive, content));
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    if (content !== '' && positive !== null) {
      setLoading(true);
      await toast.promise(handleReviewSubmit(), {
        pending: 'Submitting review...',
        success: 'Review submitted successfully',
        error: 'Failed to submit review, please try again',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="game-owned">
        <div className="owned-flag">IN LIBRARY &nbsp;&nbsp;</div>
        <div className="already-in-library">{game.name} is already in your Steam library</div>
      </div>
      <div className="already-owned">
        <div className="already-owned-actions">
          <div className="owned-actions-button">
            <a href="">
              <span> Install Steam </span>
            </a>
          </div>
          <div className="owned-actions-button">
            <a href="">
              <span> Play now </span>
            </a>
          </div>
          <div className="review-container">
            <div className="review-create">
              <h1>Write a review for {game.name}</h1>
              <p>
                {' '}
                Please describe what you liked or disliked about this game and whether you recommend
                it to others.
                <br />
                Please remember to be polite and follow the <a href="">
                  Rules and Guidelines
                </a>.{' '}
              </p>
              <div className="formatting-help">
                <a onClick={handleFormattingHelpClick}>Formatting help</a>
              </div>
              <div className="avatar-block">
                <Link href={`/id/${game.id}`}>
                  <div className="avatar online">
                    <img src={currentUserData?.profilePicture || defaultPFP.src} alt="pfp" />
                  </div>
                </Link>
              </div>
              <div className="content">
                <textarea
                  className="game-recommendation"
                  maxLength={8000}
                  onChange={handleContentChange}
                  value={content}
                />
                <div className="controls">
                  <div className="review-controls-left">
                    <div className="do-you-recommend"> Do you recommend this game? </div>
                    <div className="vote-up-down">
                      <div
                        className={`vote-btn ${positive === true ? 'checked' : ''}`}
                        onClick={handleThumbsUpClick}
                      >
                        <span>
                          <i className="thumb thumb-up" /> Yes
                        </span>
                      </div>
                      <div
                        className={`vote-btn ${positive === false ? 'checked' : ''}`}
                        onClick={handleThumbsDownClick}
                      >
                        <span>
                          <i className="thumb thumb-down" /> No
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="review-controls-right">
                    <div className="review-submit">
                      <div
                        className={`review-submit-btn ${loading ? 'loading' : ''}`}
                        onClick={handleSubmit}
                      >
                        <span>{hasReviewed ? 'Edit Review' : 'Post Review'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
