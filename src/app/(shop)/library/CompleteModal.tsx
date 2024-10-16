// Github button
import GitHubButton from 'react-github-btn';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { setIsCompleteModalOpen } from '@store/features/shop/library/librarySlice';

// Images
import githubIcon from '@images/github.png';

export default function CompleteModal() {
  // Init
  const dispatch = useAppDispatch();

  // Event Handlers
  const handleCloseCompleteClick = (): void => {
    dispatch(setIsCompleteModalOpen(false));
  };

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
          support by clicking the star button on my GitHub repository. It would mean the world to
          me!
        </p>

        <div className="message">
          <p>Your support will help me continue building and improving this project.</p>
          <p>Click the star button below to endorse the project on GitHub:</p>
        </div>

        <div className="button-group">
          <GitHubButton
            href="https://github.com/IbrahemHadidy/red-steam-frontend"
            data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star IbrahemHadidy/red-steam-frontend on GitHub"
          >
            Star Frontend Repo
          </GitHubButton>
          <GitHubButton
            href="https://github.com/IbrahemHadidy/red-steam-backend"
            data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star IbrahemHadidy/red-steam-backend on GitHub"
          >
            Star Backend Repo
          </GitHubButton>
        </div>

        <div className="visit-repos">
          <p>If you’d like to dive deeper, feel free to visit the full repositories:</p>
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
