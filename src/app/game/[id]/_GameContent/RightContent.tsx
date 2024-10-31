'use client';

// React
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Services
import { addToCart } from '@services/user/interaction';

// Utils
import convertToBase64Image from '@utils/convertToBase64Image';
import formatDate from '@utils/formatDate';
import getPlatform from '@utils/getPlatform';

// Images
import externalLinkIcon from '@images/ico_external_link.gif';

// Types
import type { JSX, MouseEvent } from 'react';
import type { RightContentProps } from './GameContent.types';

export default function RightContent({ game }: RightContentProps): JSX.Element {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isViewport630 = useResponsiveViewport(630);
  const isViewport960 = useResponsiveViewport(960);

  //--------------------------- State Selectors ---------------------------//
  const { currentUserData, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [showAllLanguages, setShowAllLanguages] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('unknown');

  // Refs
  const addToCartRef = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart]: [boolean | undefined, boolean | undefined] = useMemo(
    () => [
      currentUserData?.library?.some((item) => item.id === game.id),
      currentUserData?.cart?.some((item) => item.id === game.id),
    ],
    [currentUserData, game.id]
  );

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const toggleAllLanguages = (): void => {
    setShowAllLanguages(!showAllLanguages);
  };

  const handleAddToCartClick = async (
    e: MouseEvent<HTMLAnchorElement>,
    itemId: number
  ): Promise<void> => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      toast.warn('Please login to add items to your cart.');
      router.push('/login');
    } else if (addToCartRef.current) {
      addToCartRef.current.classList.add('loading');
      addToCartRef.current.style.pointerEvents = 'none';
      const response = await addToCart([itemId]);
      if (response?.status === 201) {
        await dispatch(fetchUserData());
      } else {
        toast.error('An error occurred. Please try again later.');
      }
      addToCartRef.current.classList.remove('loading');
      addToCartRef.current.style.pointerEvents = 'auto';
    }
  };

  // Recommendation reasons
  const firstDetails: JSX.Element | null =
    (currentUserData?.tags &&
      currentUserData.tags.filter((tag) => game.tags?.some((gameTag) => gameTag.id === tag.id))
        .length >= 3) ||
    game.averageRating >= 80 ? (
      <>
        <div className="recommendation-reason">Is this game relevant to you?</div>
        <div className="recommendation-reasons">
          {currentUserData?.tags &&
            currentUserData.tags.filter((tag) =>
              game.tags?.some((gameTag) => gameTag.id === tag.id)
            ).length >= 3 && (
              <>
                <p className="reason-for">Players like you love this game.</p>
                <hr />
              </>
            )}
          {game.averageRating >= 90 && (
            <>
              <p className="reason-for">
                User reviews:&nbsp;
                <span className="game-review-summary positive">Overwhelmingly Positive</span>
              </p>
              <hr />
            </>
          )}
          {90 > game.averageRating && game.averageRating >= 80 && (
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
    ) : null;

  // Game features
  const secondDetails: JSX.Element = (
    <div className="game-details-first">
      <div className="game-area-features-list">
        {game.features?.map((feature, idx) => (
          <Link className="game-area-details" href={`/search/${feature.id}`} key={idx}>
            <div className="feature-icon">
              <img src={convertToBase64Image(feature.icon.data)} alt={feature.name} />
            </div>
            <div className="feature-label">{feature.name}</div>
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
  const thirdDetails: JSX.Element = (
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
            {[...game.languageSupport]
              .sort((a, b) => {
                if (a.fullAudio && !b.fullAudio) return -1;
                if (!a.fullAudio && b.fullAudio) return 1;
                return a.name.localeCompare(b.name);
              })
              .map((language, idx) => (
                <tr
                  key={language.name}
                  style={{
                    display: showAllLanguages || idx < 5 ? 'table-row' : 'none',
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
        {game.languageSupport.length > 5 &&
          (!showAllLanguages ? (
            <a className="all-languages" onClick={toggleAllLanguages}>
              See all {game.languageSupport.length} supported languages
            </a>
          ) : (
            <a className="all-languages" onClick={toggleAllLanguages}>
              Collapse Languages
            </a>
          ))}
      </div>
    </div>
  );

  // Game details
  const fourthDetails: JSX.Element = (
    <div className="game-details-second">
      <div className="details-block">
        <b>Title: </b>&nbsp;
        {game.name}
        <br />
        <b>Genre: </b>&nbsp;
        {game.tags && (
          <span>
            <a>{game.tags[0].name}</a>,&nbsp;
            <a>{game.tags[1].name}</a>,&nbsp;
            <a>{game.tags[2].name}</a>,&nbsp;
            <a>{game.tags[3].name}</a>
          </span>
        )}
        <div className="dev-row">
          <b>Developers:</b>&nbsp;
          {game.developers?.map((developer, idx) => (
            <Fragment key={developer.id}>
              <a href={developer.website}>{developer.name}</a>
              {game.developers && idx < game.developers?.length - 1 && ', '}
            </Fragment>
          ))}
        </div>
        <div className="dev-row">
          <b>Publishers:</b>&nbsp;
          {game.publishers?.map((publisher, idx) => (
            <Fragment key={publisher.id}>
              <a href={publisher.website}>{publisher.name}</a>
              {game.publishers && idx < game.publishers?.length - 1 && ', '}
            </Fragment>
          ))}
        </div>
        <b>Release Date:</b>&nbsp;{formatDate(game.releaseDate)}
        <br />
      </div>
      <div className="details-block" style={{ paddingTop: '14px' }}>
        {game.link && (
          <a className="linkbar" href={game.link} target="_blank" rel="noreferrer noopenner">
            {' '}
            Visit the website{' '}
            <Image src={externalLinkIcon} width={12} height={9} alt="external link" />
          </a>
        )}
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          View update history{' '}
        </a>
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          Read related news{' '}
        </a>
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          View discussions{' '}
        </a>
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
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
              {game.platformEntries.mac && platform === 'darwin' ? (
                <span className="platform-img mac"></span>
              ) : (
                <span className="platform-img win"></span>
              )}
            </div>
            {game.pricing?.free ? (
              <>
                <h1>Play {game.name}</h1>
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    <div className="game-purchase-price"> Free to Play </div>
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
            ) : !game.pricing?.discount ? (
              <>
                <h1>Buy {game.name}</h1>
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    <div className="game-purchase-price"> ${game.pricing?.basePrice} </div>
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
            ) : (
              <>
                <h1>Buy {game.name}</h1>
                <p className="dicount-countdown">
                  {game.pricing.offerType}! Offer ends {formatDate(game.pricing.discountEndDate)}
                </p>
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    <div className="game-purchase-discount">
                      <div className="discount-precentage">-{game.pricing.discountPercentage}%</div>
                      <div className="discount-prices">
                        <div className="discount-original-price">${game.pricing.basePrice}</div>
                        <div className="discount-final-price">
                          ${game.pricing.discountPrice} USD
                        </div>
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
}
