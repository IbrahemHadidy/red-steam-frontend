'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useInitializeWishlist from '../_hooks/useInitializeWishlist';

// Utils
import getRandomArrayItem from '@utils/getRandomArrayItem';

// Constants
import { DEFAULT_BG } from '@config/constants/backgrounds';

// Components
const WishlistItem = dynamic(() => import('./WishlistItem'));

// Images
import defaultPFP from '@images/default-pfp.png';

// Types
import type { Game } from '@interfaces/game';

export default function WishlistPage() {
  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { userWishlist, isWishlistInitialized } = useAppSelector((state) => state.shop.wishlist);

  //------------------------------- Hooks ---------------------------------//
  useInitializeWishlist();

  //------------------------------- Render --------------------------------//
  useDynamicBackground(
    userWishlist.length === 0
      ? DEFAULT_BG
      : `url(${getRandomArrayItem<Game>(userWishlist).thumbnailEntries.backgroundImage}) center top no-repeat #1b2838`,
    [userWishlist]
  );

  if (!isWishlistInitialized) {
    // TODO: Add skeleton
    return <></>;
  } else {
    return (
      <>
        <div className="page-content">
          <div className="wishlist-header">
            <img src={currentUserData?.profilePicture ?? defaultPFP.src} alt="user-pfp" />
            <h2>{currentUserData?.username}'s wishlist</h2>
          </div>

          {!userWishlist || userWishlist?.length === 0 ? (
            <div className="nothing-to-see">
              <h2>Oops, there's nothing to show here</h2>
              <p>There are no items on your wishlist.</p>
            </div>
          ) : (
            userWishlist?.map((game, idx) => <WishlistItem game={game} idx={idx} key={game.id} />)
          )}
        </div>
      </>
    );
  }
}
