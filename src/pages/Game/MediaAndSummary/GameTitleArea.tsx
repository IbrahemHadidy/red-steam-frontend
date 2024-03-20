import { FC } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { toast } from 'react-toastify';

interface GameTitleAreaProps {
  category: string;
  name: string;
}

export const GameTitleArea: FC<GameTitleAreaProps> = ({ category, name }) => {
  const navigate = useSoftNavigate();

  return (
    <div className="game-title-area">
      <div className="genre-block">
        <a
          onClick={e => {
            navigate(`/search/`, e);
          }}
        >
          <span className="genre-item">All Games</span>
        </a>{' '}
        &gt;{' '}
        <a
          onClick={e => {
            navigate(`/genre/${category}/`, e);
          }}
        >
          <span className="genre-item">{category}</span>
        </a>{' '}
        &gt;{' '}
        <a
          onClick={e => {
            navigate(`/game/${name}/`, e);
          }}
        >
          <span className="genre-item">{name}</span>
        </a>
      </div>
      <div className="game-header-content">
        <div className="game-community">
          <a
            className="community-btn"
            onClick={() => toast.warn('Community Hub is not available yet')}
          >
            <span>Community Hub</span>
          </a>
        </div>
        <div className="main-game-name">{name}</div>
      </div>
    </div>
  );
};
