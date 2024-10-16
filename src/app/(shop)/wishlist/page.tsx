'use client';

// React
import { useEffect } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { initializeWishlist } from '@store/features/shop/wishlist/wishlistSlice';

// Components
const WishlistItem = dynamic(() => import('./WishlistItem'));

// Images
import defaultPFP from '@images/default-pfp.png';

export default function WishlistPage() {
  // Init
  const dispatch = useAppDispatch();

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { userWishlist } = useAppSelector((state) => state.wishlist);

  // Fetch wishlist data
  useEffect(() => {
    dispatch(initializeWishlist());
  }, [dispatch]);

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
