import {
  FC,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import $ from 'tools/$selector';
import getPlatform from 'tools/getPlatform';
import { gamesData } from 'services/gameData';
import { AuthContext } from 'contexts/AuthContext';
import {
  addToCart,
  addToLibrary,
  removeFromCart,
  removeFromWishlist,
} from 'services/user/userInteractions';

export const LeftContent: FC<{ game: gamesData; isViewport630: boolean }> = ({
  game,
  isViewport630,
}) => {
  const { userData, fetchData } = useContext(AuthContext);
  const navigate = useSoftNavigate();
  const platform = getPlatform();

  const [isAboutExpanded, setIsAboutExpanded] = useState(true);
  const [isMatureExpanded, setIsMatureExpanded] = useState(true);
  const [isSysReqExpanded, setIsSysReqExpanded] = useState(true);

  const aboutRef = useRef<HTMLDivElement>(null);
  const matureRef = useRef<HTMLDivElement>(null);
  const sysReqRef = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart, isInWishlist] = useMemo(
    () => [
      userData?.library?.includes(game.id),
      userData?.cart?.includes(game.id),
      userData?.wishlist?.some(wishlistItem => wishlistItem.item === game.id),
    ],
    [userData, game.id],
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      if (aboutRef.current && aboutRef.current.scrollHeight >= 850) {
        setIsAboutExpanded(false);
      }
      if (matureRef.current && matureRef.current.scrollHeight >= 120) {
        setIsMatureExpanded(false);
      }
      if (sysReqRef.current && sysReqRef.current.scrollHeight >= 250) {
        setIsSysReqExpanded(false);
      }
    }, 100);
  }, []);

  // Functions to toggle the visibility of each section
  const toggleAboutExpand = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  const toggleMatureExpand = () => {
    setIsMatureExpanded(!isMatureExpanded);
  };

  const toggleSysReqExpand = () => {
    setIsSysReqExpanded(!isSysReqExpanded);
  };

  const handleAddToCart = async (userId: string, itemId: string) => {
    $('.addtocart-btn')?.classList?.add('loading');
    ($('.addtocart-btn') as HTMLElement).style.pointerEvents = 'none';

    const response = await addToCart(userId, itemId);
    if (response?.status === 200) {
      fetchData();
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
    if (response?.status === 200) {
      fetchData();
      if (isInCart) {
        const removed = await removeFromCart(userId, itemId);
        if (removed?.status !== 200) {
          toast.error('An error occurred while removing item from cart.');
        }
      }
      if (isInWishlist) {
        const removed = await removeFromWishlist(userId, itemId);
        if (removed?.status !== 200) {
          toast.error('An error occurred while removing item from wishlist.');
        }
      }
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    $('.addtocart-btn')?.classList?.remove('loading');
    ($('.addtocart-btn') as HTMLElement).style.pointerEvents = 'auto';
  };

  return (
    <div className="game-content-left">
      {/* Purchase area */}
      {!isViewport630 && (
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
                    {!isInLibrary && (
                      <div className="game-purchase-price"> {game.price} </div>
                    )}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        {/* TODO: Add play game */}
                        <a
                          className="green-btn"
                          href="/library"
                          onClick={e => {
                            navigate('/library', e);
                          }}
                        >
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div>
                    ) : (
                      <div className="addtocart-btn">
                        <a
                          className="blue-btn"
                          onClick={e => {
                            e.preventDefault();
                            handleAddToLibrary(
                              userData?._id || '',
                              game.id || '',
                            );
                          }}
                        >
                          <span className="medium-btn">Add to Library</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : !game.discount ? (
              <>
                {!isInLibrary ? (
                  <h1>Buy {game.name}</h1>
                ) : (
                  <h1>Play {game.name}</h1>
                )}
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    {!isInLibrary && (
                      <div className="game-purchase-price">
                        {' '}
                        ${game.price} USD{' '}
                      </div>
                    )}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <a
                          className="green-btn"
                          href="/library"
                          onClick={e => {
                            navigate('/library', e);
                          }}
                        >
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div>
                    ) : (
                      <div className="addtocart-btn">
                        {!isInCart ? (
                          <a
                            className="green-btn"
                            onClick={e => {
                              e.preventDefault();
                              handleAddToCart(
                                userData?._id || '',
                                game.id || '',
                              );
                            }}
                          >
                            <span className="medium-btn">Add to Cart</span>
                          </a>
                        ) : (
                          <a
                            href="/cart"
                            onClick={e => {
                              navigate('/cart', e);
                            }}
                            className="green-btn"
                          >
                            <span className="medium-btn">In Cart</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {!isInLibrary ? (
                  <h1>Buy {game.name}</h1>
                ) : (
                  <h1>Play {game.name}</h1>
                )}
                {!isInLibrary && (
                  <p className="dicount-countdown">
                    {game.offerType}! Offer ends {game.offerEndDate}
                  </p>
                )}
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    {!isInLibrary && (
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
                    )}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <a
                          href="/library"
                          className="green-btn"
                          onClick={e => {
                            navigate('/library', e);
                          }}
                        >
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div>
                    ) : (
                      <div className="addtocart-btn">
                        {!isInCart ? (
                          <a className="green-btn">
                            <span
                              className="medium-btn"
                              onClick={e => {
                                e.preventDefault();
                                handleAddToCart(
                                  userData?._id || '',
                                  game.id || '',
                                );
                              }}
                            >
                              Add to Cart
                            </span>
                          </a>
                        ) : (
                          <a
                            href="/cart"
                            onClick={e => {
                              navigate('/cart', e);
                            }}
                            className="green-btn"
                          >
                            <span className="medium-btn">In Cart</span>
                          </a>
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

      {/* Game about */}
      <div className="autocollapse-container">
        <div className="autocollapse">
          <div
            className="game-description"
            style={{
              height: isAboutExpanded
                ? `${aboutRef.current?.scrollHeight}px`
                : '850px',
            }}
            ref={aboutRef}
          >
            <h2>ABOUT THIS GAME</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(game.about),
              }}
            />
          </div>
          <div
            className={`autocollapse-fade ${isAboutExpanded ? 'hidden' : ''}`}
          >
            <div className="autocollapse-readmore" onClick={toggleAboutExpand}>
              READ MORE
            </div>
          </div>
        </div>
      </div>

      {/* Game mature */}
      {game.mature && game.matureDescription && (
        <div className="autocollapse-container">
          <div className="autocollapse">
            <div
              className="game-description"
              style={{
                height: isMatureExpanded
                  ? `${matureRef.current?.scrollHeight}px`
                  : '120px',
              }}
              ref={matureRef}
            >
              <h2>MATURE CONTENT DESCRIPTION</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(game.matureDescription),
                }}
              />
            </div>
            <div
              className={`autocollapse-fade ${isMatureExpanded ? 'hidden' : ''}`}
            >
              <div
                className="autocollapse-readmore"
                onClick={toggleMatureExpand}
              >
                READ MORE
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game System Requirements */}
      {game.mac && platform === 'darwin' ? null : (
        <div className="autocollapse-container">
          <div
            className="autocollapse sys-req"
            style={{
              height: isSysReqExpanded
                ? `${sysReqRef.current?.scrollHeight}px`
                : '250px',
              overflow: 'hidden',
            }}
            ref={sysReqRef}
          >
            <h2>SYSTEM REQUIREMENTS</h2>
            <div className="sysreq-contents">
              <div className="sysreq-content">
                <div className="mini-req">
                  <ul>
                    <strong>MINIMUM:</strong>
                    <br />
                    <ul>
                      {game.req.req64 && (
                        <li>
                          Requires a 64-bit processor and operating system
                          <br />
                        </li>
                      )}
                      {game.req.mini.os && (
                        <li>
                          <strong>OS:</strong> {game.req.mini.os}
                          <br />
                        </li>
                      )}
                      {game.req.mini.cpu && (
                        <li>
                          <strong>Processor:</strong> {game.req.mini.cpu}
                          <br />
                        </li>
                      )}
                      {game.req.mini.ram && (
                        <li>
                          <strong>Memory:</strong> {game.req.mini.ram}
                          <br />
                        </li>
                      )}
                      {game.req.mini.gpu && (
                        <li>
                          <strong>Graphics:</strong> {game.req.mini.gpu}
                          <br />
                        </li>
                      )}
                      {game.req.mini.dx && (
                        <li>
                          <strong>DirectX:</strong> {game.req.mini.dx}
                          <br />
                        </li>
                      )}
                      {game.req.mini.network && (
                        <li>
                          <strong>Network:</strong> {game.req.mini.network}
                          <br />
                        </li>
                      )}
                      {game.req.mini.storage && (
                        <li>
                          <strong>Storage:</strong> {game.req.mini.storage}
                          <br />
                        </li>
                      )}
                      {game.req.mini.soundCard && (
                        <li>
                          <strong>Sound card:</strong>{' '}
                          {game.req.recommended.soundCard}
                          <br />
                        </li>
                      )}
                      {game.req.mini.vrSupport && (
                        <li>
                          <strong>VR Support:</strong> {game.req.mini.vrSupport}
                          <br />
                        </li>
                      )}
                      {game.req.mini.additionalNotes && (
                        <li>
                          <strong>Additional Notes:</strong>{' '}
                          {game.req.mini.additionalNotes}
                          <br />
                        </li>
                      )}
                    </ul>
                  </ul>
                </div>
                <div className="recommeded-req">
                  <ul>
                    <strong>RECOMMENDED:</strong>
                    <br />
                    <ul>
                      {game.req.req64 && (
                        <li>
                          Requires a 64-bit processor and operating system
                          <br />
                        </li>
                      )}
                      {game.req.recommended.os && (
                        <li>
                          <strong>OS:</strong> {game.req.recommended.os}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.cpu && (
                        <li>
                          <strong>Processor:</strong> {game.req.recommended.cpu}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.ram && (
                        <li>
                          <strong>Memory:</strong> {game.req.recommended.ram}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.gpu && (
                        <li>
                          <strong>Graphics:</strong> {game.req.recommended.gpu}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.dx && (
                        <li>
                          <strong>DirectX:</strong> {game.req.recommended.dx}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.network && (
                        <li>
                          <strong>Network:</strong>{' '}
                          {game.req.recommended.network}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.storage && (
                        <li>
                          <strong>Storage:</strong>{' '}
                          {game.req.recommended.storage}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.soundCard && (
                        <li>
                          <strong>Sound card:</strong>{' '}
                          {game.req.recommended.soundCard}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.vrSupport && (
                        <li>
                          <strong>VR Support:</strong>{' '}
                          {game.req.recommended.vrSupport}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.additionalNotes && (
                        <li>
                          <strong>Additional Notes:</strong>{' '}
                          {game.req.recommended.additionalNotes}
                          <br />
                        </li>
                      )}
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={`autocollapse-fade ${isSysReqExpanded ? 'hidden' : ''}`}
            >
              <div
                className="autocollapse-readmore"
                onClick={toggleSysReqExpand}
              >
                READ MORE
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Game legal */}
      {game.legal && (
        <div className="autocollapse-container">
          <div className="autocollapse">
            <div className="legal-area">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(game.legal),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
