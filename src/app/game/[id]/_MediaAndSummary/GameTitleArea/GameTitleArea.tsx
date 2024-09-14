'use client';

// React
import { useContext, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import DeleteModal from '@app/admin/_Admin/DeleteModal';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Images
import deleteIcon from '@images/delete.png';

// Types
import type { FC, JSX } from 'react';
import type { GameTitleAreaProps } from '../MediaAndSummary.types';

export const GameTitleArea: FC<GameTitleAreaProps> = ({ game }): JSX.Element => {
  // Init
  const router = useRouter();

  // Contexts
  const { userData } = useContext(AuthContext);

  // State
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const handleCommunityBtnClick = (): void => {
    toast.warn('Community Hub is not available yet');
  };

  const onDelete = (itemId: number): void => {
    setDeleteItemId(itemId);
    setDeleteModalOpen(true);
    toast.success('Game deleted successfully');
    router.replace('/');
  };

  return (
    <>
      <div className="game-title-area">
        <div className="genre-block">
          <Link href={`/search/`}>
            <span className="genre-item">All Games</span>
          </Link>{' '}
          &gt;{' '}
          <Link href={`/genre/${game.category}/`}>
            <span className="genre-item">{game.category}</span>
          </Link>{' '}
          &gt;{' '}
          <Link href={`/game/${game.name}/`}>
            <span className="genre-item">{game.name}</span>
          </Link>
        </div>
        <div className="game-header-content">
          <div className="game-community">
            <a className="community-btn" onClick={handleCommunityBtnClick}>
              <span>Community Hub</span>
            </a>
          </div>
          <div className="game-name-block">
            <div className="main-game-name">{game.name}</div>
            {userData?.isAdmin && (
              <div
                className="delete-icon-container"
                title="Delete game"
                onClick={() => onDelete(game.id)}
              >
                <Image
                  src={deleteIcon}
                  alt="Delete"
                  className="delete-icon"
                  width={18}
                  height={18}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {deleteModalOpen && deleteItemId && (
        <DeleteModal
          type="game"
          gameName={game.name}
          setOpen={setDeleteModalOpen}
          itemId={deleteItemId}
        />
      )}
    </>
  );
};
