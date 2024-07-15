'use client';

// React
import { useContext } from 'react';

// Next.js
import Link from 'next/link';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Images
import defaultPFP from 'images/default-pfp.png';

// Types
import type { FC, MouseEvent as ReactMouseEvent } from 'react';
import type { GameOwnedProps } from './MediaAndSummary.types';

export const GameOwned: FC<GameOwnedProps> = ({ game }) => {
  const { userPFP } = useContext(AuthContext);

  const handleFormattingHelpClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(
      'https://www.w3schools.com/html/html_formatting.asp',
      'formattinghelp',
      'height=640,width=640,resize=yes,scrollbars=yes'
    );
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
                {/* TODO: logged in userId backend logic */}
                <Link
                  href={`/id/${
                    {
                      /*userId*/
                    }
                  }`}
                >
                  <div className="avatar online">
                    <img src={userPFP || defaultPFP.src} alt="pfp" />
                  </div>
                </Link>
              </div>
              <div className="content">
                {/* TODO: error backend logic */}
                {/* <div className="error-message">There seems to have been an error saving your review.  Please try again later. </div> */}
                {/* TODO: content db logic */}
                <textarea className="game-recommendation" name="" id="" maxLength={8000} />
                <div className="controls">
                  <div className="review-controls-left">
                    <div className="do-you-recommend"> Do you recommend this game? </div>
                    <div className="vote-up-down">
                      {/* TODO: negative/positive db logic */}
                      {/* TODO: onClick should decide the state of the review type */}
                      <div className="vote-btn">
                        <span>
                          <i className="thumb thumb-up" /> Yes
                        </span>
                      </div>
                      <div className="vote-btn">
                        <span>
                          <i className="thumb thumb-down" /> No
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="review-controls-right">
                    <div className="review-submit">
                      {/* TODO: submit backend logic */}
                      {/* TODO: onClick should handle the submition */}
                      <a href="">
                        <span>Post Review</span>
                      </a>
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
};
