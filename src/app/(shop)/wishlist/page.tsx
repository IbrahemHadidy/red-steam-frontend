'use client';

// React
import { useEffect } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeWishlist } from '@store/features/shop/wishlist/wishlistSlice';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

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
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { userWishlist } = useAppSelector((state) => state.shop.wishlist);

  //------------------------------ On Mount -------------------------------//
  useEffect(() => {
    dispatch(initializeWishlist());
  }, [dispatch]);

  //-------------------------- Render UI Section --------------------------//
  useDynamicBackground(
    userWishlist.length === 0
      ? DEFAULT_BG
      : getRandomArrayItem<Game>(userWishlist).thumbnailEntries.backgroundImage,
    [userWishlist]
  );

  return (
    <>
      <div className="page-content">
        <div className="wishlist-header">
          <img src={currentUserData?.profilePicture || defaultPFP.src} alt="user-pfp" />
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
