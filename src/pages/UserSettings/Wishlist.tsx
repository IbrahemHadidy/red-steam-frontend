import { FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import useResponsiveViewports from 'hooks/useResponsiveViewports';
import { handleDeleteWishlistItem } from 'services/userSettings';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import './Wishlist.scss';

const Wishlist: FC = () => {
  const isViewport960 = useResponsiveViewports(960);
  const { userData } = useContext(AuthContext);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.background = '#1b2838';
    document.title = `${userData?.username}'s wishlist`;
  }, [userData?.username]);

  const handleDelete = async (id: string, userId: number) => {
    await handleDeleteWishlistItem(id, userId);
  }

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="wishlist-header">
          <img src={userData?.profilePicture || '/images/default-pfp.png'} />
          <h2>{userData?.username}'s wishlist</h2>
        </div>
        {!userData || userData.wishList?.length === 0 ? (
          <div className="nothing-to-see">
            <h2>Oops, there's nothing to show here</h2>
            <p>There are no items on your wishlist.</p>
          </div>
        ) : (
          userData.wishList?.map((game, index) => {
            const positiveCount = game.reviews.filter(
              review => review.type === 'positive',
            ).length;
            const totalReviews = game.reviews.length;
            const positivePercentage = (positiveCount / totalReviews) * 100;

            return (
              <div key={index} className="wishlist-container">
                <div className="wishlist-row">
                  {!isViewport960 && (
                    <a
                      className="capsule"
                      href={`/game/${game.id}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img src={game.horizontalHeaderImage} />
                      <div
                        className="screenshots"
                        style={{ opacity: hoveredIndex === index ? '1' : '0' }}
                      >
                        {game.moviesAndImages
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
                    <a href={`/game/${game.id}`} className="wishlist-title">
                      {' '}
                      {game.name}{' '}
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
                          <div className="value">{game.releaseDate}</div>
                        </div>
                      )}
                      <div className="purchase-container">
                        <div className="purchase-area">
                          {!game.discount ? (
                            <>
                              <div className="game-purchase-action">
                                <div className="game-purchase-action-background">
                                  <div className="game-purchase-price">
                                    {game.free
                                      ? 'Free to Play'
                                      : `${game.price} USD`}
                                  </div>
                                  <div className="addtocart-btn">
                                    <a href="" className="green-btn">
                                      <span className="medium-btn">
                                        {game.free
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
                                      -{game.discountPercentage}%
                                    </div>
                                    <div className="discount-prices">
                                      <div className="discount-original-price">
                                        ${game.price}
                                      </div>
                                      <div className="discount-final-price">
                                        ${game.discountPrice} USD
                                      </div>
                                    </div>
                                  </div>
                                  <div className="addtocart-btn">
                                    <a href="" className="green-btn">
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
                        {game.win && <span className="platform-img win" />}
                        {game.mac && <span className="platform-img mac" />}
                      </div>
                      <div className="lower-columns">
                        <div className="tags">
                          {game.tags.map((tag, index) => (
                            <div key={index * 9999} className="tag">
                              {tag}
                            </div>
                          ))}
                        </div>
                        <div className="added-on">
                          {game.win}
                          &nbsp;&nbsp;
                          <div className="delete" onClick={() => handleDelete(game.id, userData.userId)}>
                            remove
                          </div>
                        </div>
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
