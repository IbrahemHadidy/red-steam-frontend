'use client';

// React
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { ReviewEntry } from 'services/gameData/gameData';
import { addToCart } from 'services/user/interaction';

// Utils
import getPlatform from 'utils/getPlatform';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Images
import externalLinkIcon from 'images/ico_external_link.gif';

// Types
import type { FC, MouseEvent as ReactMouseEvent } from 'react';
import type { RightContentProps } from './GameContent.types';

const RightContent: FC<RightContentProps> = ({ game, isViewport630, isViewport960 }) => {
  // Initializations
  const router = useRouter();

  // Contexts
  const { userData, fetchData, isLoggedIn } = useContext(AuthContext);

  // States
  const [showAllLanguages, setShowAllLanguages] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('unknown');

  // Refs
  const addToCartRef = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart] = useMemo(
    () => [
      userData?.library?.some((item) => item.id === game.id),
      userData?.cart?.some((item) => item.id === game.id),
    ],
    [userData, game.id]
  );

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const toggleAllLanguages = () => {
    setShowAllLanguages(!showAllLanguages);
  };

  const positiveReviews = game.reviews.filter(
    (review: ReviewEntry) => review.type === 'positive'
  ).length;
  const negativeReviews = game.reviews.filter(
    (review: ReviewEntry) => review.type === 'negative'
  ).length;
  const positivePercentage = (positiveReviews / (positiveReviews + negativeReviews)) * 100;

  const handleAddToCartClick = async (e: ReactMouseEvent<HTMLAnchorElement>, itemId: number) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.warn('Please login to add items to your cart.');
      router.push('/login');
    } else if (addToCartRef.current) {
      addToCartRef.current.classList.add('loading');
      addToCartRef.current.style.pointerEvents = 'none';
      const response = await addToCart([itemId]);
      if (response?.status === 200) {
        fetchData();
        toast.success('Added to cart!');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
      addToCartRef.current.classList.remove('loading');
      addToCartRef.current.style.pointerEvents = 'auto';
    }
  };

  // Recommendation reasons
  const firstDetails = (
    <>
      <div className="recommendation-reason">Is this game relevant to you?</div>
      <div className="recommendation-reasons">
        <p className="reason-for">Players like you love this game.</p>
        <hr />
        {positivePercentage >= 90 && (
          <>
            <p className="reason-for">
              User reviews:&nbsp;
              <span className="game-review-summary positive">Overwhelmingly Positive</span>
            </p>
            <hr />
          </>
        )}
        {90 > positivePercentage && positivePercentage >= 80 && (
          <>
            <p className="reason-for">
              User reviews:&nbsp;
              <span className="game-review-summary positive">Very Positive</span>
            </p>
            <hr />
          </>
        )}
        {/* TODO: top sellers backend logic */}
        {/* <p className="reason-for"> In the Top Sellers </p> 
						 <hr /> */}
      </div>
    </>
  );

  // Game features
  const secondDetails = (
    <div className="game-details-first">
      <div className="game-area-features-list">
        {game.features.map((feature, index) => (
          <Link className="game-area-details" href={feature.link} key={index}>
            <div className="feature-icon">
              <img src={feature.icon} alt={feature.label} />
            </div>
            <div className="feature-label">{feature.label}</div>
          </Link>
        ))}
      </div>
      <div className="DRM-notice">
        <div>Requires agreement to a 3rd-party EULA</div>
        <div>
          <a>{game.name} EULA</a>
        </div>
      </div>
    </div>
  );

  // Game supported languages
  const thirdDetails = (
    <div className="game-details-first">
      <div className="block-title">
        <span> Languages:</span>
      </div>
      <div className="language-table">
        <table className="game-language-options">
          <tbody>
            <tr>
              <th style={{ width: '94px' }}></th>
              <th className="checkcol">Interface</th>
              <th className="checkcol">Full Audio</th>
              <th className="checkcol">Subtitles</th>
            </tr>
            {game.languages.map((language, index) => (
              <tr
                key={language.name}
                style={{
                  display: showAllLanguages || index < 5 ? 'table-row' : 'none',
                }}
              >
                <td className="game-language-name"> {language.name}</td>
                <td className="checkcol">{language.interface && <span>✔</span>}</td>
                <td className="checkcol">{language.fullAudio && <span>✔</span>}</td>
                <td className="checkcol">{language.subtitles && <span>✔</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!showAllLanguages ? (
          <a className="all-languages" onClick={toggleAllLanguages}>
            See all {game.languages.length} supported languages
          </a>
        ) : (
          <a className="all-languages" onClick={toggleAllLanguages}>
            Collapse Languages
          </a>
        )}
      </div>
    </div>
  );

  // Game details
  const fourthDetails = (
    <div className="game-details-second">
      <div className="details-block">
        <b>Title: </b>&nbsp;
        {game.name}
        <br />
        <b>Genre: </b>&nbsp;
        <span>
          <a>{game.tags[0]}</a>,&nbsp;
          <a>{game.tags[1]}</a>,&nbsp;
          <a>{game.tags[2]}</a>,&nbsp;
          <a>{game.tags[3]}</a>
        </span>
        <div className="dev-row">
          <b>Developer:</b>&nbsp;
          <a href={game.developer.link}>{game.developer.name}</a>
        </div>
        <div className="dev-row">
          <b>Publisher:</b>&nbsp;
          <a href={game.publisher.link}>{game.publisher.name}</a>
        </div>
        <b>Release Date:</b>&nbsp;{game.releaseDate}
        <br />
      </div>
      <div className="details-block" style={{ paddingTop: '14px' }}>
        {game.link && (
          <a href={game.link} target="_blank" rel="noreferrer noopenner">
            {' '}
            Visit the website <Image src={externalLinkIcon} alt="external link" />
          </a>
        )}
        <a className="linkbar" href="">
          {' '}
          View update history{' '}
        </a>
        <a className="linkbar" href="">
          {' '}
          Read related news{' '}
        </a>
        <a className="linkbar" href="">
          {' '}
          View discussions{' '}
        </a>
        <a className="linkbar" href="">
          {' '}
          Find Community Groups{' '}
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Purchase area */}
      {isViewport630 && (
        <div className="game-purchase-wrapper">
          <div className="game-purchase">
            <div className="game-purchase-platform">
              {game.mac && platform === 'darwin' ? (
                <span className="platform-img mac"></span>
              ) : (
                <span className="platform-img win"></span>
              )}
            </div>
            {game.free ? (
              <>
                <h1>Play {game.name}</h1>
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    <div className="game-purchase-price"> {game.price} </div>
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <a className="green-btn" href="">
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div>
                    ) : (
                      <div className="addtocart-btn">
                        <a href="" className="blue-btn">
                          <span className="medium-btn">Add to Library</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : !game.discount ? (
              <>
                <h1>Buy {game.name}</h1>
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    <div className="game-purchase-price"> ${game.price} </div>
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <a className="green-btn" href="">
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div>
                    ) : (
                      <div className="addtocart-btn">
                        {!isInCart ? (
                          <a
                            className="green-btn"
                            onClick={(e) => handleAddToCartClick(e, game.id)}
                          >
                            <span className="medium-btn">Add to Cart</span>
                          </a>
                        ) : (
                          <Link href="/cart" className="green-btn">
                            <span className="medium-btn">In Cart</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1>Buy {game.name}</h1>
                <p className="dicount-countdown">
                  {game.offerType}! Offer ends {game.offerEndDate}
                </p>
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    <div className="game-purchase-discount">
                      <div className="discount-precentage">-{game.discountPercentage}%</div>
                      <div className="discount-prices">
                        <div className="discount-original-price">${game.price}</div>
                        <div className="discount-final-price">${game.discountPrice} USD</div>
                      </div>
                    </div>
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <a className="green-btn" href="">
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div>
                    ) : (
                      <div className="addtocart-btn" ref={addToCartRef}>
                        {!isInCart ? (
                          <a
                            className="green-btn"
                            onClick={(e) => handleAddToCartClick(e, game.id)}
                          >
                            <span className="medium-btn">Add to Cart</span>
                          </a>
                        ) : (
                          <Link href="/cart" className="green-btn">
                            <span className="medium-btn">In Cart</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {isViewport630 ? (
        <div className="game-content-right">
          {firstDetails}
          {secondDetails}
          {thirdDetails}
          {fourthDetails}
        </div>
      ) : isViewport960 ? (
        <div className="mobile-right-content">
          <div className="game-content-right">
            {secondDetails}
            {thirdDetails}
          </div>
          <div className="game-content-right">
            {firstDetails}
            {fourthDetails}
          </div>
        </div>
      ) : (
        <div className="game-content-right">
          {firstDetails}
          {secondDetails}
          {thirdDetails}
          {fourthDetails}
        </div>
      )}
    </>
  );
};

export default RightContent;
