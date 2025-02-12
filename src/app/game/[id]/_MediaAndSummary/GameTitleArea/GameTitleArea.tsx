'use client';

// React
import { useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Toast notifications

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import DeleteModal from '@app/admin/_GameAdmin/sections/DeleteModal';

// Images
import deleteIcon from '@images/delete.png';
import updateIcon from '@images/edit.png';
import offerIcon from '@images/offer.png';

export default function GameTitleArea() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const pathname = usePathname();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { currentGame } = useAppSelector((state) => state.game);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  //--------------------------- Event Handlers ----------------------------//
  const onUpdate = (itemId?: number): void => {
    if (!itemId) return;
    router.push(`/admin/update-game/${itemId}`);
  };

  const onOffer = (itemId?: number): void => {
    if (!itemId) return;
    router.push(`/admin/create-offer/${itemId}`);
  };

  const onDelete = (itemId?: number): void => {
    if (!itemId) return;
    setDeleteModalOpen(true);
  };

  ///------------------------------ Render --------------------------------//
  return (
    <>
      <div className="game-title-area">
        <div className="genre-block">
          <Link href={`/search/`}>
            <span className="genre-item">All Games</span>
          </Link>{' '}
          &gt; <span className="genre-item">{currentGame?.category}</span> &gt;{' '}
          <Link href={`/game/${currentGame?.id}/`}>
            <span className="genre-item">{currentGame?.name}</span>
          </Link>
        </div>
        <div className="game-header-content">
          <div className="game-community">
            <a className="community-btn disabled">
              <span>Community Hub</span>
            </a>
          </div>

          <div className="game-name-block">
            <div className="main-game-name">{currentGame?.name}</div>

            {currentUserData?.isAdmin && !pathname?.includes('/admin') && (
              <>
                <div
                  className="update-icon-container"
                  title="Update game details"
                  onClick={() => onUpdate(currentGame?.id)}
                >
                  <Image
                    src={updateIcon}
                    alt="Update"
                    className="update-icon"
                    width={18}
                    height={18}
                  />
                </div>

                {(!currentGame?.pricing?.free ||
                  (currentGame?.pricing?.free && currentGame?.pricing?.discount)) && (
                  <div
                    className="offer-icon-container"
                    title="Add offer"
                    onClick={() => onOffer(currentGame?.id)}
                  >
                    <Image
                      src={offerIcon}
                      alt="Offer"
                      className="offer-icon"
                      width={18}
                      height={18}
                    />
                  </div>
                )}

                <div
                  className="delete-icon-container"
                  title="Delete game"
                  onClick={() => onDelete(currentGame?.id)}
                >
                  <Image
                    src={deleteIcon}
                    alt="Delete"
                    className="delete-icon"
                    width={18}
                    height={18}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {deleteModalOpen && (
        <DeleteModal
          gameId={currentGame?.id ?? 0}
          gameName={currentGame?.name ?? ''}
          setOpen={setDeleteModalOpen}
        />
      )}
    </>
  );
}
