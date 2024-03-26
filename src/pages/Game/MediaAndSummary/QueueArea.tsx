import { FC, useContext, useMemo, useState } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { toast } from 'react-toastify';
import $ from 'tools/$selector';
import { AuthContext } from 'contexts/AuthContext';
import { gamesData } from 'services/gameData';
import {
  addToWishlist,
  removeFromWishlist,
} from 'services/user/userInteractions';

export const QueueArea: FC<{ game: gamesData }> = ({ game }, isViewport630) => {
  const navigate = useSoftNavigate();
  const { isLoggedIn, userData, fetchData } = useContext(AuthContext);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(
    userData?.wishlist?.some(({ item }) => item === game.id),
  );

  const [isInLibrary, isInCart] = useMemo(
    () => [
      userData?.library?.includes(game.id),
      userData?.cart?.includes(game.id),
    ],
    [userData, game.id],
  );

  const handleRemoveFromWishlist = async (userId: string, itemId: string) => {
    $('#added-wishlist')?.classList?.add('loading');
    ($('#added-wishlist') as HTMLElement).style.pointerEvents = 'none';
    const response = await removeFromWishlist(userId, itemId);
    if (response?.status === 200) {
      fetchData();
      setIsAddedToWishlist(false);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    $('#added-wishlist')?.classList?.remove('loading');
    ($('#added-wishlist') as HTMLElement).style.pointerEvents = 'auto';
  };

  const handleAddToWishlist = async (userId: string, itemId: string) => {
    $('#add-wishlist')?.classList?.add('loading');
    ($('#add-wishlist') as HTMLElement).style.pointerEvents = 'none';
    const response = await addToWishlist(userId, itemId);
    if (response?.status === 200) {
      fetchData();
      setIsAddedToWishlist(true);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    $('#add-wishlist')?.classList?.remove('loading');
    ($('#add-wishlist') as HTMLElement).style.pointerEvents = 'auto';
  };

  return (
    <div className="queue-area">
      {!isLoggedIn && (
        <div className="queue-actions">
          <a
            onClick={e => {
              navigate(`/login`, e);
            }}
          >
            Sign in
          </a>{' '}
          to add this item to your wishlist, follow it, or mark it as ignored
        </div>
      )}

      {isLoggedIn && (
        <div className="queue-actions">
          {!isViewport630 && (
            <a className="view-queue-button" href="">
              <span>
                View Your Queue&nbsp;&nbsp;&nbsp;
                <i className="arrow-next" />
              </span>
            </a>
          )}

          {!isAddedToWishlist ? (
            <div
              id="add-wishlist"
              className="queue-button-container"
              onClick={e => {
                e.preventDefault();
                isInLibrary
                  ? navigate(`/library`)
                  : isInCart
                    ? navigate(`/cart`)
                    : handleAddToWishlist(userData?._id || '', game.id);
              }}
            >
              <a className="queue-button" href="">
                <span>
                  {isInLibrary
                    ? 'You own this item '
                    : isInCart
                      ? 'Already in your cart'
                      : 'Add to your wishlist'}
                </span>
              </a>
            </div>
          ) : (
            <div
              id="added-wishlist"
              className="queue-button-container"
              onClick={e => {
                e.preventDefault();
                handleRemoveFromWishlist(userData?._id || '', game.id);
              }}
            >
              <a className="queue-button" href="">
                <span>
                  <img src="/images/ico_selected.png" alt="" /> On Wishlist
                </span>
              </a>
            </div>
          )}
          <div id="follow" className="queue-button-container">
            {/* TODO: isFollowed backend logic */}
            <div
              className="queue-button"
              style={{ display: 'inline-block' }}
              onClick={e => {
                e.preventDefault();
                toast.warn('Community features are not yet supported');
              }}
            >
              <span>Follow</span>
            </div>
            {/* !isFollowed */}
            <div className="queue-button" style={{ display: 'none' }}>
              <span>
                <img src="/images/ico_selected.png" alt="" /> Following
              </span>
            </div>
          </div>

          {/* TODO: isNotIgnored backend logic */}
          <div
            id="ignore"
            className="queue-button-container"
            style={{ display: 'inline-block' }}
            onClick={e => {
              e.preventDefault();
              toast.warn('Not implemented yet');
            }}
          >
            <div className="queue-button">
              <span>Ignore</span>
            </div>
          </div>
          {/* !isNotIgnored */}
          <div
            id="ignored"
            className="queue-button-container"
            style={{ display: 'none' }}
          >
            <div className="queue-button">
              <span>
                <img src="/images/ico_selected.png" alt="" /> Ignored
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
