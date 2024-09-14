'use client';

// Images
import glitchImage from '@images/glitch-image.png';

// Styles
import '@styles/not-found.scss';

// Types
import type { FC, JSX } from 'react';

const NotFound: FC = (): JSX.Element => {
  return (
    <>
      <div className="not-found">
        <img src={glitchImage.src} alt="Page Not Found" className="not-found-image" />
        <div className="not-found-content">
          <h1 className="not-found-heading" data-text="404">
            404
          </h1>
          <p className="not-found-text" data-text="Oops! Page Not Found">
            Oops! Game Not Found
          </p>
          <p className="not-found-text" data-text="The game you're looking for could not be found.">
            The page you're looking for could not be found.
          </p>
          <p
            className="not-found-text"
            data-text="It seems like you've wandered into uncharted territory."
          >
            It seems like you've wandered into uncharted territory.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
