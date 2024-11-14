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
import offerIcon from '@images/offer.png';

export default function GameTitleArea() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const pathname = usePathname();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { currentGame } = useAppSelector((state) => state.game);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  //--------------------------- Event Handlers ----------------------------//
  const handleCommunityBtnClick = (): void => {
    toast.warn('Community Hub is not available yet');
  };

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
    setDeleteItemId(itemId);
    setDeleteModalOpen(true);
  };

  //------------------------- Render UI Section ---------------------------//
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
            <a className="community-btn" onClick={handleCommunityBtnClick}>
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

      {deleteModalOpen && deleteItemId && (
        <DeleteModal
          type="game"
          gameName={currentGame?.name}
          setOpen={setDeleteModalOpen}
          itemId={deleteItemId}
        />
      )}
    </>
  );
}
