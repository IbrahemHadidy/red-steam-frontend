'use client';

// React
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// Next.js
import Link from 'next/link';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import gameData from 'services/gameData/gameData';
import { addToCart, addToLibrary, removeFromWishlist } from 'services/user/interaction';

// Images
import defaultPFP from 'images/default-pfp.png';

// Styles
import './Wishlist.scss';

// Types
import type { FC } from 'react';
import type { gamesData } from 'services/gameData/gameData';
import { getRatingClass, getRatingText } from 'utils/ratingUtils';

const Wishlist: FC = () => {
  // Initializations
  const isViewport960 = useResponsiveViewport(960);

  // Contexts
  const { userData, userPFP, fetchData } = useContext(AuthContext);

  // States
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [userWishlist, setUserWishlist] = useState<gamesData[]>([]);

  // Refs
  const addToCartBtn1Ref = useRef<HTMLDivElement>(null);
  const addToCartBtn2Ref = useRef<HTMLDivElement>(null);
  const removeBtnRef = useRef<HTMLDivElement>(null);

  useDynamicMetaTags(
    {
      title: `${userData?.username}'s wishlist`,
      background: '#1b2838',
    },
    [userData?.username]
  );

  const isInCart = (game: gamesData) => userData?.cart?.some((item) => item.id === game.id);

  const updateWishlist = useCallback(async () => {
    setUserWishlist(
      userData?.wishlist
        ?.map((wishlistItem) => {
          return gameData.find((game) => game.id === wishlistItem.id);
        })
        .filter((game): game is gamesData => game !== undefined) ?? []
    );
  }, [userData?.wishlist]);

  useEffect(() => {
    if (userData) {
      updateWishlist();
    }
  }, [updateWishlist, userData]);

  const handleAddToCart = async (itemId: number) => {
    addToCartBtn1Ref.current?.classList.add('loading');
    addToCartBtn2Ref.current?.classList.add('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'none');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'none');
    const response = await addToCart([itemId]);
    if (response?.status === 200) {
      fetchData();
      toast.success('Added to cart!');
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    addToCartBtn1Ref.current?.classList?.remove('loading');
    addToCartBtn2Ref.current?.classList?.remove('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'auto');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'auto');
  };

  const handleAddToLibrary = async (itemId: number) => {
    addToCartBtn1Ref.current?.classList.add('loading');
    addToCartBtn2Ref.current?.classList.add('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'none');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'none');
    const response = await addToLibrary([itemId]);
    if (response?.status === 200) {
      fetchData();
      toast.success('Added to library!');
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    addToCartBtn1Ref.current?.classList?.remove('loading');
    addToCartBtn2Ref.current?.classList?.remove('loading');
    addToCartBtn1Ref.current && (addToCartBtn1Ref.current.style.pointerEvents = 'auto');
    addToCartBtn2Ref.current && (addToCartBtn2Ref.current.style.pointerEvents = 'auto');
  };

  const handleRemove = async (itemId: number) => {
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

  const handleCapsulePointerMove = (idx: number) => {
    setHoveredIndex(idx);
  };

  const handleCapsulePointerLeave = () => {
    setHoveredIndex(null);
  };

  const handleAddToCartBtn1Click = (game: gamesData) => {
    if (game?.free) {
      handleAddToLibrary(game?.id);
    } else {
      handleAddToCart(game?.id);
    }
  };

  const handleAddToCartBtn2Click = (game: gamesData) => {
    handleAddToCart(game?.id);
  };

  const handleRemoveBtnClick = (game: gamesData) => {
    handleRemove(game?.id);
  };

  return (
    <>
      <Header />
      <SecondNavbar />
      <div className="page-content">
        <div className="wishlist-header">
          <img src={userPFP || defaultPFP.src} alt="user-pfp" />
          <h2>{userData?.username}'s wishlist</h2>
        </div>
        {!userWishlist || userWishlist?.length === 0 ? (
          <div className="nothing-to-see">
            <h2>Oops, there's nothing to show here</h2>
            <p>There are no items on your wishlist.</p>
          </div>
        ) : (
          userWishlist?.map((game, idx) => {
            const positiveCount = game?.reviews.filter(
              (review) => review.type === 'positive'
            ).length;
            const totalReviews = game?.reviews.length;
            const positivePercentage = ((positiveCount || 0) / (totalReviews || 1)) * 100;
            const summary = getRatingText(positivePercentage);
            const ratingClass = getRatingClass(positivePercentage);

            return (
              <div key={idx} className="wishlist-container">
                <div className="wishlist-row">
                  {!isViewport960 && (
                    <Link
                      className="capsule"
                      href={`/game/${game?.id}`}
                      onPointerMove={() => handleCapsulePointerMove(idx)}
                      onPointerLeave={handleCapsulePointerLeave}
                    >
                      <img src={game?.horizontalHeaderImage} alt="game-header" />
                      <div
                        className="screenshots"
                        style={{ opacity: hoveredIndex === idx ? '1' : '0' }}
                      >
                        {game?.moviesAndImages
                          .filter((item) => item.type === 'image' && item.featured)
                          .map((item, index) => (
                            <div
                              key={index * 100}
                              style={{ backgroundImage: `url(${item.link})` }}
                            />
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
                          <div className={`value game-review-summary ${ratingClass}`}>
                            {summary}
                            &nbsp;
                          </div>
                          <div className="label">Release Date:</div>
                          <div className="value">{game?.releaseDate}</div>
                        </div>
                      )}
                      <div className="purchase-container">
                        <div className="purchase-area">
                          {!game?.discount ? (
                            <>
                              <div className="game-purchase-action">
                                <div className="game-purchase-action-background">
                                  <div className="game-purchase-price">
                                    {game?.free ? 'Free to Play' : `${game?.price} USD`}
                                  </div>
                                  <div className="addtocart-btn" ref={addToCartBtn1Ref}>
                                    <a
                                      className="green-btn"
                                      onClick={() => handleAddToCartBtn1Click(game)}
                                    >
                                      <span className="medium-btn">
                                        {game?.free ? 'Add to Library' : 'Add to Cart'}
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
                                      -{game?.discountPercentage}%
                                    </div>
                                    <div className="discount-prices">
                                      <div className="discount-original-price">${game?.price}</div>
                                      <div className="discount-final-price">
                                        ${game?.discountPrice} USD
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
                        {game?.win && <span className="platform-img win" />}
                        {game?.mac && <span className="platform-img mac" />}
                      </div>
                      <div className="lower-columns">
                        <div className="tags">
                          {game?.tags.map((tag, idx) => (
                            <div key={idx * 9999} className="tag">
                              {tag}
                            </div>
                          ))}
                        </div>
                        {userData?.wishlist &&
                        userData?.wishlist[idx] &&
                        userData?.wishlist[idx].addedOn ? (
                          <div className="added-on">
                            Added on&nbsp;
                            {new Date(userData?.wishlist[idx].addedOn).toLocaleDateString()}
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
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
