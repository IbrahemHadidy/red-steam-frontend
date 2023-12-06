import { FC } from "react";
import { gamesData } from "../gameData";
import DOMPurify from "dompurify";

const getPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("mac")) {
    return "darwin";
  } else if (userAgent.includes("win")) {
    return "win32";
  } else {
    return "unknown";
  }
};

export const LeftContent: FC<{ game: gamesData }> = ({ game }) => {
  const platform = getPlatform();

  return (
    <div className="game-content-left">

      {/* Purchase area */}
      <div className="game-purchase-wrapper">
        <div className="game-purchase">
          <div className="game-purchase-platform">
            {game.mac && platform === "darwin" ? (
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
                  <div className="play-game-btn">
                    <a className="green-btn" href="">
                      <span className="medium-btn">Play Game</span>
                    </a>
                  </div>
                  {/* !isInLibrary */}
                  <div className="addtocart-btn">
                    <a href="" className="blue-btn">
                      <span className="medium-btn">Add to Library</span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : game.discount === "no-discount" ? (
            <>
              <h1>Buy {game.name}</h1>
              <div className="game-purchase-action">
                <div className="game-purchase-action-background">
                  <div className="game-purchase-price"> {game.price} </div>
                  {/* isInLibrary backend logic */}
                  {/* <div className="play-game-btn">
                        <a className="green-btn" href="">
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div> */}

                  {/* !isInLibrary */}
                  <div className="addtocart-btn">
                    {/* isNotInCart backend logic */}
                    <a href="" className="green-btn">
                      <span className="medium-btn">Add to Cart</span>
                    </a>
                    {/* !isNotInCart*/}
                    {/* <a href="" className="green-btn">
                          <span className="medium-btn">In Cart</span>
                        </a> */}
                  </div>
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
                    <div className="discount-precentage">
                      {game.discountPercentage}
                    </div>
                    <div className="discount-prices">
                      <div className="discount-original-price">
                        {game.price}
                      </div>
                      <div className="discount-final-price">
                        {game.discountPrice} USD
                      </div>
                    </div>
                  </div>
                  {/* isInLibrary backend logic */}
                  {/* <div className="play-game-btn">
                        <a className="green-btn" href="">
                          <span className="medium-btn">Play Game</span>
                        </a>
                      </div> */}

                  {/* !isInLibrary */}
                  <div className="addtocart-btn">
                    {/* isNotInCart backend logic */}
                    <a href="" className="green-btn">
                      <span className="medium-btn">Add to Cart</span>
                    </a>
                    {/* !isNotInCart*/}
                    {/* <a href="" className="green-btn">
                          <span className="medium-btn">In Cart</span>
                        </a> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Game about */}
      <div className="autocollapse-container">
        <div className="autocollapse">
          <div className="game-description">
            <h2>ABOUT THIS GAME</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(game.about),
              }}
            />
          </div>
          <div className="autocollapse-fade">
            <div className="autocollapse-readmore">READ MORE</div>
          </div>
        </div>
      </div>

      {/* Game mature */}
      {game.mature && (
        <div className="autocollapse-container">
          <div className="autocollapse">
            <div className="game-description">
              <h2>MATURE CONTENT DESCRIPTION</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(game.matureDescription),
                }}
              />
            </div>
            <div className="autocollapse-fade">
              <div className="autocollapse-readmore">READ MORE</div>
            </div>
          </div>
        </div>
      )}

      {/* Game System Requirements */}
      {game.mac && platform === "darwin" ? null : (
        <div className="autocollapse-container">
          <div className="autocollapse sys-req">
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
                      <li>
                        <strong>OS:</strong> {game.req.mini.os}
                        <br />
                      </li>
                      <li>
                        <strong>Processor:</strong> {game.req.mini.cpu}
                        <br />
                      </li>
                      <li>
                        <strong>Memory:</strong> {game.req.mini.ram}
                        <br />
                      </li>
                      <li>
                        <strong>Graphics:</strong> {game.req.mini.gpu}
                        <br />
                      </li>
                      <li>
                        <strong>DirectX:</strong> {game.req.mini.dx}
                        <br />
                      </li>
                      <li>
                        <strong>Network:</strong> {game.req.mini.network}
                        <br />
                      </li>
                      <li>
                        <strong>Storage:</strong> {game.req.mini.storage}
                        <br />
                      </li>
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
                      <li>
                        <strong>OS:</strong> {game.req.recommended.os}
                        <br />
                      </li>
                      <li>
                        <strong>Processor:</strong> {game.req.recommended.cpu}
                        <br />
                      </li>
                      <li>
                        <strong>Memory:</strong> {game.req.recommended.ram}
                        <br />
                      </li>
                      <li>
                        <strong>Graphics:</strong> {game.req.recommended.gpu}
                        <br />
                      </li>
                      <li>
                        <strong>DirectX:</strong> {game.req.recommended.dx}
                        <br />
                      </li>
                      <li>
                        <strong>Network:</strong> {game.req.recommended.network}
                        <br />
                      </li>
                      <li>
                        <strong>Storage:</strong> {game.req.recommended.storage}
                        <br />
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
            <div className="autocollapse-fade">
              <div className="autocollapse-readmore">READ MORE</div>
            </div>
          </div>

          {/* Game legal */}
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
        </div>
      )}
    </div>
  );
};
