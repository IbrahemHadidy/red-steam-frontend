// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { setIsCompleteModalOpen } from '@store/features/shop/library/librarySlice';

// Images
import githubIcon from '@images/github.png';

export default function CompleteModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //---------------------------- Event Handlers ----------------------------//
  const handleCloseCompleteClick = (): void => {
    dispatch(setIsCompleteModalOpen(false));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="complete-modal">
      <div>
        <h2>Thank You for Completing Your Journey!</h2>
        <p>
          I'm thrilled to have had you on this journey with me. Your time and effort are greatly
          appreciated, and I hope you've enjoyed the experience.
        </p>
        <p>
          If you found my project helpful or inspiring, I would be honored if you could show your
          support by clicking the star button on my GitHub repositories. It would mean a lot to me!
        </p>
        <p>Also, if you’d like to dive deeper into the code, you can find it on my GitHub.</p>

        <div className="visit-repos">
          <div className="repo-links">
            <a
              href="https://github.com/IbrahemHadidy/red-steam-frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon.src} alt="External Link" /> Visit Frontend Repo
            </a>
            <a
              href="https://github.com/IbrahemHadidy/red-steam-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon.src} alt="External Link" /> Visit Backend Repo
            </a>
          </div>
        </div>

        <div className="close-btn" onClick={handleCloseCompleteClick}>
          Close
        </div>
      </div>
    </div>
  );
}
