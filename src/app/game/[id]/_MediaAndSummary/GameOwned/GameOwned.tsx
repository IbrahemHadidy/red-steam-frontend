'use client';

// NextJS

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setContent, setPositive } from '@store/features/game/gameSlice';

// Redux Thunks
import { submitReview } from '@store/features/game/gameThunks';

// Images
import defaultPFP from '@images/default-pfp.png';

// Types
import type { ChangeEvent, MouseEvent } from 'react';

export default function GameOwned() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { currentGame, hasReviewed, positive, content, isReviewBtnDisabled } = useAppSelector(
    (state) => state.game
  );

  //--------------------------- Event Handlers ----------------------------//
  const handleFormattingHelpClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    window.open(
      'https://www.w3schools.com/html/html_formatting.asp',
      'formattinghelp',
      'height=640,width=640,resize=yes,scrollbars=yes'
    );
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    dispatch(setContent(value));
  };

  const handleThumbsUpClick = (): void => {
    dispatch(setPositive(true));
  };

  const handleThumbsDownClick = (): void => {
    dispatch(setPositive(false));
  };

  const handleSubmit = async (e: MouseEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(submitReview());
  };

  //------------------------------- Render --------------------------------//
  const isSubmitBtnDisabled = isReviewBtnDisabled || content === '' || positive === null;
  return (
    <>
      <div className="game-owned">
        <div className="owned-flag">IN LIBRARY &nbsp;&nbsp;</div>

        <div className="already-in-library">
          {currentGame?.name} is already in your Steam library
        </div>
      </div>

      <div className="already-owned">
        <div className="already-owned-actions">
          <div className="review-container">
            <div className="review-create">
              <h1>Write a review for {currentGame?.name}</h1>

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
                  <div className="avatar online">
                    <img src={currentUserData?.profilePicture ?? defaultPFP.src} alt="pfp" />
                  </div>
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
                        className={`review-submit-btn ${isSubmitBtnDisabled ? 'loading' : ''}`}
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
