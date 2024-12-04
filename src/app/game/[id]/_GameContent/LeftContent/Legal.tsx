// React
import { useEffect, useState } from 'react';

// Sanitization library
import DOMPurify from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function Legal() {
  //------------------------------- States --------------------------------//
  const { currentGame } = useAppSelector((state) => state.game);
  const [sanitizedLegal, setSanitizedLegal] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && currentGame?.legal) {
      setSanitizedLegal(DOMPurify.sanitize(currentGame.legal));
    }
  }, [currentGame?.legal]);

  //------------------------------- Render --------------------------------//
  return (
    currentGame?.legal && (
      <div className="autocollapse-container">
        <div className="autocollapse">
          <div className="legal-area">
            <p
              dangerouslySetInnerHTML={{
                __html: sanitizedLegal,
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}
