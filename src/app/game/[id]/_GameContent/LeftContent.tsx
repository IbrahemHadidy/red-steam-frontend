'use client';

// React
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sanitization library
import { sanitize } from 'dompurify';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Services
import { addToCart, addToLibrary } from '@services/user/interaction';

// Utils
import formatDate from '@utils/formatDate';
import getPlatform from '@utils/getPlatform';

// Types
import type { Dispatch, JSX, MouseEvent, SetStateAction } from 'react';
import type { LeftContentProps } from './GameContent.types';

export default function LeftContent({ game }: LeftContentProps): JSX.Element {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const platform = getPlatform();
  const dispatch = useAppDispatch();
  const isViewport630 = useResponsiveViewport(630);

  //--------------------------- State Selectors ---------------------------//
  const { currentUserData, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [isAboutExpanded, setIsAboutExpanded] = useState<boolean>(true);
  const [isMatureExpanded, setIsMatureExpanded] = useState<boolean>(true);
  const [isSysReqExpanded, setIsSysReqExpanded] = useState<boolean>(true);

  // Refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const matureRef = useRef<HTMLDivElement>(null);
  const sysReqRef = useRef<HTMLDivElement>(null);
  const addToCartBtnRef = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart]: [boolean | undefined, boolean | undefined] = useMemo(
    () => [
      currentUserData?.library?.some((item) => item.id === game.id),
      currentUserData?.cart?.some((item) => item.id === game.id),
    ],
    [currentUserData, game.id]
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
    }, 500);
  }, []);

  const toggleExpand = (setExpand: Dispatch<SetStateAction<boolean>>, expanded: boolean): void => {
    setExpand(!expanded);
  };

  const handleAddToCartClick = async (itemId: number): Promise<void> => {
    if (!isUserLoggedIn) {
      toast.warn('Please login to add items to your cart.');
      router.push('/login');
    } else if (addToCartBtnRef.current) {
      addToCartBtnRef.current.classList.add('loading');
      addToCartBtnRef.current.style.pointerEvents = 'none';

      const response = await addToCart([itemId]);
      if (response?.status === 201) await dispatch(fetchUserData());

      addToCartBtnRef.current.classList.remove('loading');
      addToCartBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  const handleAddToLibraryClick = async (
    e: MouseEvent<HTMLAnchorElement>,
    itemId: number
  ): Promise<void> => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      toast.warn('Please login to add items to your library.');
      router.push('/login');
    } else if (addToCartBtnRef.current) {
      addToCartBtnRef.current.classList?.add('loading');
      addToCartBtnRef.current.style.pointerEvents = 'none';

      const response = await addToLibrary([itemId]);
      if (response?.status === 201) await dispatch(fetchUserData());

      addToCartBtnRef.current.classList?.remove('loading');
      addToCartBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  const handleAboutExpandClick = (): void => {
    toggleExpand(setIsAboutExpanded, isAboutExpanded);
  };

  const handleMatureExpandClick = (): void => {
    toggleExpand(setIsMatureExpanded, isMatureExpanded);
  };

  const handleSysReqExpandClick = (): void => {
    toggleExpand(setIsSysReqExpanded, isSysReqExpanded);
  };

  return (
    <div className="game-content-left">
      {/* Purchase area */}
      {!isViewport630 && (
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
                    {!isInLibrary && <div className="game-purchase-price"> Free to Play </div>}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <Link className="green-btn" href="/library">
                          <span className="medium-btn">Play Game</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="addtocart-btn" ref={addToCartBtnRef}>
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
            ) : !game.pricing?.discount ? (
              <>
                {!isInLibrary ? <h1>Buy {game.name}</h1> : <h1>Play {game.name}</h1>}
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    {!isInLibrary && (
                      <div className="game-purchase-price"> ${game.pricing?.basePrice} USD </div>
                    )}
                    {isInLibrary ? (
                      <div className="play-game-btn">
                        <Link className="green-btn" href="/library">
                          <span className="medium-btn">Play Game</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="addtocart-btn" ref={addToCartBtnRef}>
                        {!isInCart ? (
                          <div className="green-btn" onClick={() => handleAddToCartClick(game.id)}>
                            <span className="medium-btn">Add to Cart</span>
                          </div>
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
                    {game.pricing.offerType}! Offer ends {formatDate(game.pricing.discountEndDate)}
                  </p>
                )}
                <div className="game-purchase-action">
                  <div className="game-purchase-action-background">
                    {!isInLibrary && (
                      <div className="game-purchase-discount">
                        <div className="discount-precentage">
                          -{game.pricing.discountPercentage}%
                        </div>
                        <div className="discount-prices">
                          <div className="discount-original-price">${game.pricing.basePrice}</div>
                          <div className="discount-final-price">
                            ${game.pricing.discountPrice} USD
                          </div>
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
                          <div className="green-btn">
                            <span
                              className="medium-btn"
                              onClick={() => handleAddToCartClick(game.id)}
                            >
                              Add to Cart
                            </span>
                          </div>
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
                __html: typeof window !== 'undefined' ? sanitize(game.about) : game.about,
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
                  __html:
                    typeof window !== 'undefined'
                      ? sanitize(game.matureDescription)
                      : game.matureDescription,
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
      {game.platformEntries.mac && platform === 'darwin' ? null : (
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
                      {game.systemRequirements.req64 && (
                        <li>
                          Requires a 64-bit processor and operating system
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.os && (
                        <li>
                          <strong>OS:</strong> {game.systemRequirements.mini.os}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.cpu && (
                        <li>
                          <strong>Processor:</strong> {game.systemRequirements.mini.cpu}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.ram && (
                        <li>
                          <strong>Memory:</strong> {game.systemRequirements.mini.ram}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.gpu && (
                        <li>
                          <strong>Graphics:</strong> {game.systemRequirements.mini.gpu}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.dx && (
                        <li>
                          <strong>DirectX:</strong> {game.systemRequirements.mini.dx}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.network && (
                        <li>
                          <strong>Network:</strong> {game.systemRequirements.mini.network}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.storage && (
                        <li>
                          <strong>Storage:</strong> {game.systemRequirements.mini.storage}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.soundCard && (
                        <li>
                          <strong>Sound card:</strong>{' '}
                          {game.systemRequirements.recommended.soundCard}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.vrSupport && (
                        <li>
                          <strong>VR Support:</strong> {game.systemRequirements.mini.vrSupport}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.mini.additionalNotes && (
                        <li>
                          <strong>Additional Notes:</strong>{' '}
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                typeof window !== 'undefined'
                                  ? sanitize(game.systemRequirements.mini.additionalNotes)
                                  : game.systemRequirements.mini.additionalNotes,
                            }}
                          />
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
                      {game.systemRequirements.req64 && (
                        <li>
                          Requires a 64-bit processor and operating system
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.os && (
                        <li>
                          <strong>OS:</strong> {game.systemRequirements.recommended.os}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.cpu && (
                        <li>
                          <strong>Processor:</strong> {game.systemRequirements.recommended.cpu}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.ram && (
                        <li>
                          <strong>Memory:</strong> {game.systemRequirements.recommended.ram}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.gpu && (
                        <li>
                          <strong>Graphics:</strong> {game.systemRequirements.recommended.gpu}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.dx && (
                        <li>
                          <strong>DirectX:</strong> {game.systemRequirements.recommended.dx}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.network && (
                        <li>
                          <strong>Network:</strong> {game.systemRequirements.recommended.network}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.storage && (
                        <li>
                          <strong>Storage:</strong> {game.systemRequirements.recommended.storage}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.soundCard && (
                        <li>
                          <strong>Sound card:</strong>{' '}
                          {game.systemRequirements.recommended.soundCard}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.vrSupport && (
                        <li>
                          <strong>VR Support:</strong>{' '}
                          {game.systemRequirements.recommended.vrSupport}
                          <br />
                        </li>
                      )}
                      {game.systemRequirements.recommended.additionalNotes && (
                        <li>
                          <strong>Additional Notes:</strong>{' '}
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                typeof window !== 'undefined'
                                  ? sanitize(game.systemRequirements.recommended.additionalNotes)
                                  : game.systemRequirements.recommended.additionalNotes,
                            }}
                          />
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
                  __html: typeof window !== 'undefined' ? sanitize(game.legal) : game.legal,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
