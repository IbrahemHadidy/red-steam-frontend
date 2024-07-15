'use client';

// React
import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';

// Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sanitization library
import DomPurify from 'dompurify';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { addToCart, addToLibrary } from 'services/user/interaction';

// Utils
import getPlatform from 'utils/getPlatform';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Types
import type { Dispatch, FC, MouseEvent as ReactMouseEvent, SetStateAction } from 'react';
import type { LeftContentProps } from './GameContent.types';

const LeftContent: FC<LeftContentProps> = ({ game, isViewport630 }) => {
  // Initializations
  const router = useRouter();
  const platform = getPlatform();
  const sanitize = DomPurify.sanitize;

  // Contexts
  const { userData, fetchData, isLoggedIn } = useContext(AuthContext);

  // States
  const [isAboutExpanded, setIsAboutExpanded] = useState<boolean>(true);
  const [isMatureExpanded, setIsMatureExpanded] = useState<boolean>(true);
  const [isSysReqExpanded, setIsSysReqExpanded] = useState<boolean>(true);

  // Refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const matureRef = useRef<HTMLDivElement>(null);
  const sysReqRef = useRef<HTMLDivElement>(null);
  const addToCartBtnRef = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart] = useMemo(
    () => [
      userData?.library?.some((item) => item.id === game.id),
      userData?.cart?.some((item) => item.id === game.id),
    ],
    [userData, game.id]
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      if (aboutRef.current && aboutRef.current.scrollHeight >= 850) {
        setIsAboutExpanded(false);
      }
      if (matureRef.current && matureRef.current.scrollHeight >= 120) {
        setIsMatureExpanded(false);
      }
      if (sysReqRef.current && sysReqRef.current.scrollHeight >= 220) {
        setIsSysReqExpanded(false);
      }
    }, 2000);
  }, []);

  const toggleExpand = (setExpand: Dispatch<SetStateAction<boolean>>, expanded: boolean) => {
    setExpand(!expanded);
  };

  const handleAddToCartClick = async (e: ReactMouseEvent<HTMLElement>, itemId: number) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.warn('Please login to add items to your cart.');
      router.push('/login');
    } else if (addToCartBtnRef.current) {
      addToCartBtnRef.current.classList.add('loading');
      addToCartBtnRef.current.style.pointerEvents = 'none';

      const response = await addToCart([itemId]);
      if (response?.status === 200) {
        fetchData();
      } else {
        toast.error('An error occurred. Please try again later.');
      }

      addToCartBtnRef.current.classList.remove('loading');
      addToCartBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  const handleAddToLibraryClick = async (e: ReactMouseEvent<HTMLAnchorElement>, itemId: number) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.warn('Please login to add items to your library.');
      router.push('/login');
    } else if (addToCartBtnRef.current) {
      addToCartBtnRef.current.classList?.add('loading');
      addToCartBtnRef.current.style.pointerEvents = 'none';
      await addToLibrary([itemId]);
      addToCartBtnRef.current.classList?.remove('loading');
      addToCartBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  const handleAboutExpandClick = () => {
    toggleExpand(setIsAboutExpanded, isAboutExpanded);
  };

  const handleMatureExpandClick = () => {
    toggleExpand(setIsMatureExpanded, isMatureExpanded);
  };

  const handleSysReqExpandClick = () => {
    toggleExpand(setIsSysReqExpanded, isSysReqExpanded);
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
                    {!isInLibrary && <div className="game-purchase-price"> {game.price} </div>}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <Link className="green-btn" href="/library">
                          <span className="medium-btn">Play Game</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="addtocart-btn">
                        <a
                          className="blue-btn"
                          onClick={(e) => handleAddToLibraryClick(e, game.id)}
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
                {!isInLibrary ? <h1>Buy {game.name}</h1> : <h1>Play {game.name}</h1>}
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    {!isInLibrary && <div className="game-purchase-price"> ${game.price} USD </div>}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <Link className="green-btn" href="/library">
                          <span className="medium-btn">Play Game</span>
                        </Link>
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
                {!isInLibrary ? <h1>Buy {game.name}</h1> : <h1>Play {game.name}</h1>}
                {!isInLibrary && (
                  <p className="dicount-countdown">
                    {game.offerType}! Offer ends {game.offerEndDate}
                  </p>
                )}
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    {!isInLibrary && (
                      <div className="game-purchase-discount">
                        <div className="discount-precentage">-{game.discountPercentage}%</div>
                        <div className="discount-prices">
                          <div className="discount-original-price">${game.price}</div>
                          <div className="discount-final-price">${game.discountPrice} USD</div>
                        </div>
                      </div>
                    )}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <Link href="/library" className="green-btn">
                          <span className="medium-btn">Play Game</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="addtocart-btn" ref={addToCartBtnRef}>
                        {!isInCart ? (
                          <a className="green-btn">
                            <span
                              className="medium-btn"
                              onClick={(e) => handleAddToCartClick(e, game.id)}
                            >
                              Add to Cart
                            </span>
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

      {/* Game about */}
      <div className="autocollapse-container">
        <div className="autocollapse">
          <div
            className="game-description"
            style={{
              height: isAboutExpanded ? `${aboutRef.current?.scrollHeight}px` : '850px',
            }}
            ref={aboutRef}
          >
            <h2>ABOUT THIS GAME</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(game.about),
              }}
            />
          </div>
          <div className={`autocollapse-fade ${isAboutExpanded ? 'hidden' : ''}`}>
            <div className="autocollapse-readmore" onClick={handleAboutExpandClick}>
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
                height: isMatureExpanded ? `${matureRef.current?.scrollHeight}px` : '120px',
              }}
              ref={matureRef}
            >
              <h2>MATURE CONTENT DESCRIPTION</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(game.matureDescription),
                }}
              />
            </div>
            <div className={`autocollapse-fade ${isMatureExpanded ? 'hidden' : ''}`}>
              <div className="autocollapse-readmore" onClick={handleMatureExpandClick}>
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
              height: isSysReqExpanded ? `${sysReqRef.current?.scrollHeight}px` : '220px',
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
                          <strong>Sound card:</strong> {game.req.recommended.soundCard}
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
                          <strong>Additional Notes:</strong> {game.req.mini.additionalNotes}
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
                          <strong>Network:</strong> {game.req.recommended.network}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.storage && (
                        <li>
                          <strong>Storage:</strong> {game.req.recommended.storage}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.soundCard && (
                        <li>
                          <strong>Sound card:</strong> {game.req.recommended.soundCard}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.vrSupport && (
                        <li>
                          <strong>VR Support:</strong> {game.req.recommended.vrSupport}
                          <br />
                        </li>
                      )}
                      {game.req.recommended.additionalNotes && (
                        <li>
                          <strong>Additional Notes:</strong> {game.req.recommended.additionalNotes}
                          <br />
                        </li>
                      )}
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`autocollapse-fade ${isSysReqExpanded ? 'hidden' : ''}`}>
              <div className="autocollapse-readmore" onClick={handleSysReqExpandClick}>
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
                  __html: sanitize(game.legal),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftContent;
