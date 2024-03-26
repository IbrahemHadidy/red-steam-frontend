import { FC, useCallback, useContext, useEffect, useState } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { AuthContext } from 'contexts/AuthContext';
import useResponsiveViewport from 'hooks/useResponsiveViewport';
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import { toast } from 'react-toastify';
import $ from 'tools/$selector';
import {
  addToCart,
  addToLibrary,
  removeFromWishlist,
} from 'services/user/userInteractions';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import Footer from 'components/Footer/Footer';
import gameData, { gamesData } from 'services/gameData';
import './Wishlist.scss';

const Wishlist: FC = () => {
  const navigate = useSoftNavigate();
  const isViewport960 = useResponsiveViewport(960);
  const { userData, fetchData } = useContext(AuthContext);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [userWishlist, setUserWishlist] = useState<gamesData[]>([]);

  useDynamicMetaTags({
    title: `${userData?.username}'s wishlist`,
    background: '#1b2838',
  }, [userData?.username]);

  const updateWishlist = useCallback(async () => {
    setUserWishlist(
      userData?.wishlist
        ?.map(({ item }) => {
          return gameData.find(game => game.id === item);
        })
        .filter((game): game is gamesData => game !== undefined) ?? [],
    );
  }, [userData?.wishlist]);

  useEffect(() => {
    if (userData) {
      updateWishlist();
    }
  }, [updateWishlist, userData]);

  const handleAddToCart = async (userId: string, itemId: string) => {
    $('.addtocart-btn')?.classList?.add('loading');
    ($('.addtocart-btn') as HTMLElement).style.pointerEvents = 'none';
    const response = await addToCart(userId, itemId);
    const removed = await removeFromWishlist(userId, itemId);
    if (response?.status === 200 && removed?.status === 200) {
      fetchData();
      toast.success('Added to cart!');
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    $('.addtocart-btn')?.classList?.remove('loading');
    ($('.addtocart-btn') as HTMLElement).style.pointerEvents = 'auto';
  };

  const handleAddToLibrary = async (userId: string, itemId: string) => {
    $('.addtocart-btn')?.classList?.add('loading');
    ($('.addtocart-btn') as HTMLElement).style.pointerEvents = 'none';
    const response = await addToLibrary(userId, itemId);
    const removed = await removeFromWishlist(userId, itemId);
    if (response?.status === 200 && removed?.status === 200) {
      fetchData();
      toast.success('Added to library!');
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    $('.addtocart-btn')?.classList?.remove('loading');
    ($('.addtocart-btn') as HTMLElement).style.pointerEvents = 'auto';
  };

  const handleRemove = async (userId: string, itemId: string) => {
    $('.delete')?.classList?.add('loading');
    ($('.delete') as HTMLElement).style.pointerEvents = 'none';
    const response = await removeFromWishlist(userId, itemId);
    if (response?.status === 200) {
      fetchData();
      updateWishlist();
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    $('.delete')?.classList?.remove('loading');
    ($('.delete') as HTMLElement).style.pointerEvents = 'auto';
  };

  return (
    <>
      <Header />
      <SecondNavbar />
      <div className="page-content">
        <div className="wishlist-header">
          <img src={userData?.profilePicture || '/images/default-pfp.png'} />
          <h2>{userData?.username}'s wishlist</h2>
        </div>
        {!userWishlist || userWishlist?.length === 0 ? (
          <div className="nothing-to-see">
            <h2>Oops, there's nothing to show here</h2>
            <p>There are no items on your wishlist.</p>
          </div>
        ) : (
          userWishlist?.map((game, index) => {
            const positiveCount = game?.reviews.filter(
              review => review.type === 'positive',
            ).length;
            const totalReviews = game?.reviews.length;
            const positivePercentage =
              ((positiveCount || 0) / (totalReviews || 1)) * 100;

            return (
              <div key={index} className="wishlist-container">
                <div className="wishlist-row">
                  {!isViewport960 && (
                    <a
                      className="capsule"
                      onClick={e => {
                        navigate(`/game/${game?.id}`, e);
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img src={game?.horizontalHeaderImage} />
                      <div
                        className="screenshots"
                        style={{ opacity: hoveredIndex === index ? '1' : '0' }}
                      >
                        {game?.moviesAndImages
                          .filter(
                            item => item.type === 'image' && item.featured,
                          )
                          .map((item, index) => (
                            <div
                              key={index * 100}
                              style={{ backgroundImage: `url(${item.link})` }}
                            />
                          ))}
                      </div>
                    </a>
                  )}
                  <div className="content">
                    <a
                      onClick={e => {
                        navigate(`/game/${game?.id}`, e);
                      }}
                      className="wishlist-title"
                    >
                      {' '}
                      {game?.name}{' '}
                    </a>
                    <div className="mid-container">
                      {!isViewport960 && (
                        <div className="stats">
                          <div className="label">Overall Reviews:</div>
                          <div
                            className={`value game-review-summary ${
                              positivePercentage < 75 && positivePercentage > 40
                                ? 'mixed'
                                : positivePercentage >= 75
                                  ? 'positive'
                                  : positivePercentage >= 40
                                    ? 'negative'
                                    : ''
                            }`}
                          >
                            {positivePercentage >= 90
                              ? 'Overwhelmingly Positive'
                              : positivePercentage >= 80
                                ? 'Very Positive'
                                : positivePercentage >= 75
                                  ? 'Mostly Positive'
                                  : positivePercentage > 40 &&
                                      positivePercentage < 75
                                    ? 'Mixed'
                                    : positivePercentage <= 10
                                      ? 'Overwhelmingly Negative'
                                      : positivePercentage <= 20
                                        ? 'Very Negative'
                                        : positivePercentage <= 40
                                          ? 'Mostly Negative'
                                          : 'No reviews yet.'}
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
                                    {game?.free
                                      ? 'Free to Play'
                                      : `${game?.price} USD`}
                                  </div>
                                  <div className="addtocart-btn">
                                    <a
                                      className="green-btn"
                                      onClick={() => {
                                        game?.free
                                          ? handleAddToLibrary(
                                              userData?._id || '',
                                              game?.id || '',
                                            )
                                          : handleAddToCart(
                                              userData?._id || '',
                                              game?.id || '',
                                            );
                                      }}
                                    >
                                      <span className="medium-btn">
                                        {game?.free
                                          ? 'Add to Library'
                                          : 'Add to Cart'}
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
                                      <div className="discount-original-price">
                                        ${game?.price}
                                      </div>
                                      <div className="discount-final-price">
                                        ${game?.discountPrice} USD
                                      </div>
                                    </div>
                                  </div>
                                  <div className="addtocart-btn">
                                    <a
                                      className="green-btn"
                                      onClick={() =>
                                        handleAddToCart(
                                          userData?._id || '',
                                          game?.id || '',
                                        )
                                      }
                                    >
                                      <span className="medium-btn">
                                        Add to Cart
                                      </span>
                                    </a>
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
                          {game?.tags.map((tag, index) => (
                            <div key={index * 9999} className="tag">
                              {tag}
                            </div>
                          ))}
                        </div>
                        {userData?.wishlist &&
                        userData?.wishlist[index] &&
                        userData?.wishlist[index].addedOn ? (
                          <div className="added-on">
                            Added on&nbsp;
                            {new Date(
                              userData?.wishlist[index].addedOn,
                            ).toLocaleDateString()}
                            &nbsp;(&nbsp;
                            <div
                              className="delete"
                              onClick={() =>
                                handleRemove(
                                  userData?._id || '',
                                  game?.id || '',
                                )
                              }
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
