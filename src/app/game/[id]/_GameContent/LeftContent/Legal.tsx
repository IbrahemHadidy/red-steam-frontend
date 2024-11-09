// Sanitization library
import { sanitize } from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function Legal() {
  //--------------------------- State Selectors ---------------------------//
  const { currentGame } = useAppSelector((state) => state.game);

  //-------------------------- Render UI Section --------------------------//
  return (
    currentGame?.legal && (
      <div className="autocollapse-container">
        <div className="autocollapse">
          <div className="legal-area">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  typeof window !== 'undefined' ? sanitize(currentGame.legal) : currentGame.legal,
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}
