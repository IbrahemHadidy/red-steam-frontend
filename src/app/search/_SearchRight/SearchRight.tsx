// React
import { useState } from 'react';

// Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
import RightCol from './RightCol';

export default function SearchRight() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960OrLess = useResponsiveViewport(960);

  //------------------------------- States --------------------------------//
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleShowClick = (): void => {
    setIsShown(true);
  };

  const handleOverlayClick = (): void => {
    setIsShown(false);
  };

  return !isViewport960OrLess ? (
    <RightCol />
  ) : (
    <>
      <div className="open-filters" onClick={handleShowClick} />
      {isShown && <div className="overlay show" onClick={handleOverlayClick} />}
      <div className={`s-slide-menu ${isShown ? 'shown' : ''}`}>
        <div className="right-col-wrapper">
          <RightCol />
        </div>
      </div>
    </>
  );
}
