import { FC } from "react";
import { gamesData } from "../gameData";

interface RightGameSummaryProps {
  game: gamesData;
}

export const RightGameSummary: FC<RightGameSummaryProps> = ({ game }) => {
  
  let positivePercentage: number = 0;
  function getReviewSummary(
    positiveCount: number,
    _negativeCount: number,
    totalReviews: number
  ) {
    positivePercentage = (positiveCount / totalReviews) * 100;
  
    if (positivePercentage >= 90) return "Overwhelmingly Positive";
    if (positivePercentage >= 80) return "Very Positive";
    if (positivePercentage >= 75) return "Mostly Positive";
    if (positivePercentage > 40 && positivePercentage < 75) return "Mixed";
    if (positivePercentage <= 10)  return "Overwhelmingly Negative";
    if (positivePercentage <= 20) return "Very Negative";
    if (positivePercentage <= 40) return "Mostly Negative";
  }
  
  function getHoverInfo(positiveCount: number, totalReviews: number) {
    const positivePercentage = (positiveCount / totalReviews) * 100;
  
    return `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
  }
  
  const totalReviews = game.reviews.positive + game.reviews.negative;
  const summary = getReviewSummary(
    game.reviews.positive,
    game.reviews.negative,
    totalReviews
  );
  
  return (
    <div className="right-game-summary">
      <div className="game-image">
        <img className="image-full" src={game.headerImage} alt="" />
      </div>
      <div className="game-discription">{game.description}</div>
      <div className="game-glance-first">
        <div className="user-reviews">
          <div className="user-reviews-summary">
            <div className="summary-subtitle">All Reviews:</div>
            <div className="summary-column">
              <span
                className={`game-review-summary ${
                  positivePercentage < 75 && positivePercentage > 40
                    ? "mixed"
                    : positivePercentage >= 75
                    ? "positive"
                    : positivePercentage >= 40
                    ? "negative"
                    : ""
                }`}
              >
                {summary}
              </span>
              <span className="game-review-count">
                {" "}
                ({game.reviews.positive + game.reviews.negative})
              </span>
              <span className="review-tooltip">
                {getHoverInfo(
                  game.reviews.positive,
                  game.reviews.positive + game.reviews.negative
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="release-date">
          <div className="summary-subtitle">Release Date:</div>
          <div className="date">{game.releaseDate}</div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Developer:</div>
          <div className="summary-column">
            <a href={game.developer.link}>{game.developer.name}</a>
          </div>
        </div>
        <div className="dev-publish">
          <div className="summary-subtitle">Publisher:</div>
          <div className="summary-column">
            <a href={game.developer.link}>{game.developer.name}</a>
          </div>
        </div>
      </div>
      <div className="user-defined-tags">
        <div className="glance-tags-label">
          Popular user-defined tags for this product:
        </div>
        <div className="glance-tags">
          <a className="game-tag" href="">
            {game.tags[0]}
          </a>
          <a className="game-tag" href="">
            {game.tags[1]}
          </a>
          <a className="game-tag" href="">
            {game.tags[2]}
          </a>
          <a className="game-tag" href="">
            {game.tags[3]}
          </a>
        </div>
      </div>
    </div>
  );
};
