// React
import { useEffect, useRef, useState } from 'react';

// Sanitization library
import DOMPurify from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function Mature() {
  const { currentGame } = useAppSelector((state) => state.game);
  const [isMatureExpanded, setIsMatureExpanded] = useState<boolean>(true);
  const [sanitizedMatureDescription, setSanitizedMatureDescription] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && currentGame?.matureDescription) {
      setSanitizedMatureDescription(DOMPurify.sanitize(currentGame.matureDescription));
    }
  }, [currentGame?.matureDescription]);

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
                __html: sanitizedMatureDescription,
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
