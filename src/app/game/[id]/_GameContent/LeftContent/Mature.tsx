// React
import { useEffect, useRef, useState } from 'react';

// Sanitization library
import { sanitize } from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function Mature() {
  const { currentGame } = useAppSelector((state) => state.game);
  const [isMatureExpanded, setIsMatureExpanded] = useState<boolean>(true);

  const matureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matureRef.current && matureRef.current.scrollHeight >= 120) setIsMatureExpanded(false);
  }, [matureRef]);

  const handleMatureExpandClick = () => setIsMatureExpanded(true);

  return (
    <div className="autocollapse-container">
      <div className="autocollapse">
        <div
          className="game-description"
          style={{
            height: isMatureExpanded ? `${matureRef.current?.scrollHeight}px` : '120px',
          }}
          ref={matureRef}
        >
          <h2>MATURE CONTENT DESCRIPTION</h2>
          {currentGame?.matureDescription && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  typeof window !== 'undefined'
                    ? sanitize(currentGame.matureDescription)
                    : currentGame.matureDescription,
              }}
            />
          )}
        </div>

        <div className={`autocollapse-fade ${isMatureExpanded ? 'hidden' : ''}`}>
          <div className="autocollapse-readmore" onClick={handleMatureExpandClick}>
            READ MORE
          </div>
        </div>
      </div>
    </div>
  );
}
