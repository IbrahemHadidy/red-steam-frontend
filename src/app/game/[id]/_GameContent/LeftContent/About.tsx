// React
import { useEffect, useRef, useState } from 'react';

// Sanitization library
import { sanitize } from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function About() {
  const { currentGame } = useAppSelector((state) => state.game);
  const [isAboutExpanded, setIsAboutExpanded] = useState<boolean>(true);

  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current && aboutRef.current.scrollHeight >= 850) setIsAboutExpanded(false);
  }, [aboutRef]);

  const handleAboutExpandClick = () => setIsAboutExpanded(true);

  return (
    <div className="autocollapse-container">
      <div className="autocollapse">
        <div
          className="game-description"
          style={{
            height: isAboutExpanded ? `${aboutRef.current?.scrollHeight}px` : '850px',
          }}
          ref={aboutRef}
        >
          <h2>ABOUT THIS GAME</h2>
          {currentGame && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  typeof window !== 'undefined' ? sanitize(currentGame.about) : currentGame.about,
              }}
            />
          )}
        </div>

        <div className={`autocollapse-fade ${isAboutExpanded ? 'hidden' : ''}`}>
          <div className="autocollapse-readmore" onClick={handleAboutExpandClick}>
            READ MORE
          </div>
        </div>
      </div>
    </div>
  );
}
