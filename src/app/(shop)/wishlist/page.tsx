'use client';

// React
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// NextJS
import Link from 'next/link';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { getByIds } from '@services/game/data';
import { addToCart, addToLibrary, removeFromWishlist } from '@services/user/interaction';

// Utils
import formatDate from '@utils/formatDate';
import { getRatingClass, getRatingText } from '@utils/ratingUtils';

// Images
import defaultPFP from '@images/default-pfp.png';

// Types
import type { Game } from '@entities/game.entity';
import type { FC, JSX } from 'react';

const WishlistPage: FC = (): JSX.Element => {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  // Contexts
  const { userData, fetchData } = useContext(AuthContext);

  // States
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [userWishlist, setUserWishlist] = useState<Game[]>([]);

  // Refs
  const addToCartBtn1Ref = useRef<HTMLDivElement>(null);
  const addToCartBtn2Ref = useRef<HTMLDivElement>(null);
  const removeBtnRef = useRef<HTMLDivElement>(null);

  const isInCart = (game: Game): boolean | undefined =>
    userData?.cart?.some((item) => item.id === game.id);

  const updateWishlist = useCallback(async (): Promise<void> => {
    setUserWishlist(await getByIds(userData?.wishlist?.map((item) => item.id) || []));
  }, [userData?.wishlist]);

  useEffect(() => {
    if (userData) {
      updateWishlist();
    }
  }, [updateWishlist, userData]);

  const handleAddToCart = async (itemId: number): Promise<void> => {
    addToCartBtn1Ref.current?.classList.add('loading');
    addToCartBtn2Ref.current?.classList.add('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'none');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'none');
    const response = await addToCart([itemId]);
    if (response?.status === 201) {
      fetchData();
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    addToCartBtn1Ref.current?.classList?.remove('loading');
    addToCartBtn2Ref.current?.classList?.remove('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'auto');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'auto');
  };

  const handleAddToLibrary = async (itemId: number): Promise<void> => {
    addToCartBtn1Ref.current?.classList.add('loading');
    addToCartBtn2Ref.current?.classList.add('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'none');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'none');
    const response = await addToLibrary([itemId]);
    if (response?.status === 201) {
      fetchData();
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    addToCartBtn1Ref.current?.classList?.remove('loading');
    addToCartBtn2Ref.current?.classList?.remove('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'auto');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'auto');
  };

  const handleRemove = async (itemId: number): Promise<void> => {
    removeBtnRef.current?.classList.add('loading');
    removeBtnRef.current && (removeBtnRef.current.style.pointerEvents = 'none');
    const response = await removeFromWishlist([itemId]);
    if (response?.status === 200) {
      fetchData();
      updateWishlist();
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    removeBtnRef.current?.classList?.remove('loading');
    removeBtnRef.current && (removeBtnRef.current.style.pointerEvents = 'auto');
  };

  const handleCapsulePointerMove = (idx: number): void => {
    setHoveredIndex(idx);
  };

  const handleCapsulePointerLeave = (): void => {
    setHoveredIndex(null);
  };

  const handleAddToCartBtn1Click = (game: Game): void => {
    if (game?.pricing?.free) {
      handleAddToLibrary(game?.id);
    } else {
      handleAddToCart(game?.id);
    }
  };

  const handleAddToCartBtn2Click = (game: Game): void => {
    handleAddToCart(game?.id);
  };

  const handleRemoveBtnClick = (game: Game): void => {
    handleRemove(game?.id);
  };

  return (
    <>
      <div className="page-content">
        <div className="wishlist-header">
          <img src={userData?.profilePicture || defaultPFP.src} alt="user-pfp" />
          <h2>{userData?.username}'s wishlist</h2>
        </div>
        {!userWishlist || userWishlist?.length === 0 ? (
          <div className="nothing-to-see">
            <h2>Oops, there's nothing to show here</h2>
            <p>There are no items on your wishlist.</p>
          </div>
        ) : (
          userWishlist?.map((game, idx) => (
            <div key={game.id} className="wishlist-container">
              <div className="wishlist-row">
                {!isViewport960 && (
                  <Link
                    className="capsule"
                    href={`/game/${game?.id}`}
                    onMouseEnter={() => handleCapsulePointerMove(idx)}
                    onMouseLeave={handleCapsulePointerLeave}
                  >
                    <img src={game?.thumbnailEntries.horizontalHeaderImage} alt="game-header" />
                    <div
                      className="screenshots"
                      style={{ opacity: hoveredIndex === idx ? '1' : '0' }}
                    >
                      {game?.imageEntries.map((item, idx) => (
                        <div key={idx * 100} style={{ backgroundImage: `url(${item.link})` }} />
                      ))}
                    </div>
                  </Link>
                )}
                <div className="content">
                  <Link href={`/game/${game?.id}`} className="wishlist-title">
                    {' '}
                    {game?.name}{' '}
                  </Link>
                  <div className="mid-container">
                    {!isViewport960 && (
                      <div className="stats">
                        <div className="label">Overall Reviews:</div>
                        <div
                          className={`value game-review-summary ${getRatingClass(game.averageRating)}`}
                        >
                          {getRatingText(game.averageRating, game.reviewsCount)}
                          &nbsp;
                        </div>
                        <div className="label">Release Date:</div>
                        <div className="value">{formatDate(game?.releaseDate)}</div>
                      </div>
                    )}
                    <div className="purchase-container">
                      <div className="purchase-area">
                        {!game?.pricing?.discount ? (
                          <>
                            <div className="game-purchase-action">
                              <div className="game-purchase-action-background">
                                <div className="game-purchase-price">
                                  {game?.pricing?.free
                                    ? 'Free to Play'
                                    : `${game?.pricing?.price} USD`}
                                </div>
                                <div className="addtocart-btn" ref={addToCartBtn1Ref}>
                                  <a
                                    className="green-btn"
                                    onClick={() => handleAddToCartBtn1Click(game)}
                                  >
                                    <span className="medium-btn">
                                      {game?.pricing?.free ? 'Add to Library' : 'Add to Cart'}
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="game-purchase-action">
                              <div className="game-purchase-action-background">
                                <div className="game-purchase-discount">
                                  <div className="discount-precentage">
                                    -{game?.pricing.discountPercentage}%
                                  </div>
                                  <div className="discount-prices">
                                    <div className="discount-original-price">
                                      ${game?.pricing.basePrice}
                                    </div>
                                    <div className="discount-final-price">
                                      ${game?.pricing.discountPrice} USD
                                    </div>
                                  </div>
                                </div>
                                <div className="addtocart-btn" ref={addToCartBtn2Ref}>
                                  {!isInCart(game) ? (
                                    <a
                                      className="green-btn"
                                      onClick={() => handleAddToCartBtn2Click(game)}
                                    >
                                      <span className="medium-btn">Add to Cart</span>
                                    </a>
                                  ) : (
                                    <Link href="/cart" className="green-btn">
                                      <span className="medium-btn">In Cart</span>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lower-container">
                    <div className="platform-icons">
                      {game?.platformEntries.win && <span className="platform-img win" />}
                      {game?.platformEntries.mac && <span className="platform-img mac" />}
                    </div>
                    <div className="lower-columns">
                      <div className="tags">
                        {game?.tags?.map((tag, idx) => (
                          <div key={idx * 9999} className="tag">
                            {tag.name}
                          </div>
                        ))}
                      </div>
                      {userData?.wishlist &&
                      userData?.wishlist[idx] &&
                      userData?.wishlist[idx].addedOn ? (
                        <div className="added-on">
                          Added on&nbsp;
                          {formatDate(userData?.wishlist[idx].addedOn)}
                          &nbsp;(&nbsp;
                          <div
                            className="delete"
                            onClick={() => handleRemoveBtnClick(game)}
                            ref={removeBtnRef}
                          >
                            remove
                          </div>
                          &nbsp;)
                        </div>
                      ) : (
                        <div className="added-on">No date available</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default WishlistPage;
