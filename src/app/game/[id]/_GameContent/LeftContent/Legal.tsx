// Sanitization library
import dompurify from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function Legal() {
  const sanitize = dompurify.sanitize;

  //------------------------------- States --------------------------------//
  const { currentGame } = useAppSelector((state) => state.game);

  //------------------------------- Render --------------------------------//
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
