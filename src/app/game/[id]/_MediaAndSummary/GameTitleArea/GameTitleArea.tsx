'use client';

// React
import { useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import DeleteModal from '@app/admin/_Admin/DeleteModal';

// Images
import deleteIcon from '@images/delete.png';
import updateIcon from '@images/edit.png';

// Types
import type { JSX } from 'react';
import type { GameTitleAreaProps } from '../MediaAndSummary.types';

export default function GameTitleArea({ game }: GameTitleAreaProps): JSX.Element {
  // Init
  const router = useRouter();
  const pathname = usePathname();

  // State
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const handleCommunityBtnClick = (): void => {
    toast.warn('Community Hub is not available yet');
  };

  const onUpdate = (itemId: number): void => {
    router.push(`/admin/update-game/${itemId}`);
  };

  const onDelete = (itemId: number): void => {
    setDeleteItemId(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="game-title-area">
        <div className="genre-block">
          <Link href={`/search/`}>
            <span className="genre-item">All Games</span>
          </Link>{' '}
          &gt; <span className="genre-item">{game.category}</span> &gt;{' '}
          <Link href={`/game/${game.id}/`}>
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
            {currentUserData?.isAdmin && !pathname?.includes('/admin') && (
              <div
                className="update-icon-container"
                title="Update game"
                onClick={() => onUpdate(game.id)}
              >
                <Image
                  src={updateIcon}
                  alt="Update"
                  className="update-icon"
                  width={18}
                  height={18}
                />
              </div>
            )}
            {currentUserData?.isAdmin && !pathname?.includes('/admin') && (
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
}
