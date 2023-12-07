import { FC, useEffect, useState } from "react";
import { ReviewEntry, gamesData } from "../gameData";

export const RightContent: FC<{ game: gamesData }> = ({ game }) => {

    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);

    useEffect(() => {
      const handleResize = () => {
        setIsMobileView(window.innerWidth <= 1000);
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const toggleAllLanguages = () => {
      setShowAllLanguages(!showAllLanguages);
    };
  
    const positiveReviews = game.reviews.filter((review: ReviewEntry) => review.type === "positive").length;
    const negativeReviews = game.reviews.filter((review: ReviewEntry) => review.type === "negative").length;
    const positivePercentage = (positiveReviews / (positiveReviews + negativeReviews)) * 100;

    // Recommendation reasons
    const firstDetails = (
        <>
          <div className="recommendation-reason">Is this game relevant to you?</div>
          <div className="recommendation-reasons">
            <p className="reason-for">Players like you love this game.</p>
            <hr />
            {positivePercentage >= 90 && (
              <p className="reason-for">
                User reviews:&nbsp;
                <span className="game-review-summary positive">
                  Overwhelmingly Positive
                </span>
              </p>
            )}
            {/* top sellers backend logic */}
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
                <a className="game-area-details" href={feature.link} key={index}>
                  <div className="feature-icon">
                    <img src={feature.icon} alt={feature.label} />
                  </div>
                  <div className="feature-label">{feature.label}</div>
                </a>
              ))}
            </div>
            <div className="DRM-notice">
              <div>Requires agreement to a 3rd-party EULA</div>
              <div>
                <a href="">{game.name} EULA</a>
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
                    <th style={{ width: "94px" }}></th>
                    <th className="checkcol">Interface</th>
                    <th className="checkcol">Full Audio</th>
                    <th className="checkcol">Subtitles</th>
                  </tr>
                  {game.languages.map((language, index) => (
                    <tr
                      key={language.name}
                      style={{
                        display:
                          showAllLanguages || index < 5 ? "table-row" : "none",
                      }}
                    >
                      <td className="game-language-name"> {language.name}</td>
                      <td className="checkcol">
                        {language.interface && <span>✔</span>}
                      </td>
                      <td className="checkcol">
                        {language.fullAudio && <span>✔</span>}
                      </td>
                      <td className="checkcol">
                        {language.subtitles && <span>✔</span>}
                      </td>
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
              <a href="">{game.tags[0]}</a>,&nbsp;
              <a href="">{game.tags[1]}</a>,&nbsp;
              <a href="">{game.tags[2]}</a>,&nbsp;
              <a href="">{game.tags[3]}</a>
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
          <div className="details-block" style={{ paddingTop: "14px" }}>
            {game.link && <a className="linkbar" href={game.link}>
              {" "}
              Visit the website <img src="/images/ico_external_link.gif" />
            </a>}
            <a className="linkbar" href="">
              {" "}
              View update history{" "}
            </a>
            <a className="linkbar" href="">
              {" "}
              Read related news{" "}
            </a>
            <a className="linkbar" href="">
              {" "}
              View discussions{" "}
            </a>
            <a className="linkbar" href="">
              {" "}
              Find Community Groups{" "}
            </a>
          </div>
        </div>
      );

      return <>{isMobileView ? (
        <div className="mobile-right-content">
          <div className="game-content-right">{secondDetails}{thirdDetails}</div>
          <div className="game-content-right">{firstDetails}{fourthDetails}</div>
        </div>
      ) : (
        <div className="game-content-right">
          {firstDetails}
          {secondDetails}
          {thirdDetails}
          {fourthDetails}
        </div>
      )}</>
        
      
      
}