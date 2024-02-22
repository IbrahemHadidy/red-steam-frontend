import { FC, ReactNode, useState } from "react";
import useResponsiveViewports from 'hooks/useResponsiveViewports';
import { ReviewEntry, gamesData } from "services/gameData";
import TagsModal from "./TagsModal";

export const RightGameSummary: FC<{ game: gamesData; isViewport630: ReactNode }> = ({ game, isViewport630 }) => {  
  const isViewport960 = useResponsiveViewports(960);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
	let positivePercentage: number = 0;

	function getReviewSummary(positiveCount: number, _negativeCount: number, totalReviews: number) {
		positivePercentage = (positiveCount / totalReviews) * 100;

		if (positivePercentage >= 90) return "Overwhelmingly Positive";
		if (positivePercentage >= 80) return "Very Positive";
		if (positivePercentage >= 75) return "Mostly Positive";
		if (positivePercentage > 40 && positivePercentage < 75) return "Mixed";
		if (positivePercentage <= 10) return "Overwhelmingly Negative";
		if (positivePercentage <= 20) return "Very Negative";
		if (positivePercentage <= 40) return "Mostly Negative";
	}

	const totalReviews = game.reviews.length;
	const positiveReviews = game.reviews.filter((review: ReviewEntry) => review.type === "positive").length;
	const negativeReviews = game.reviews.filter((review: ReviewEntry) => review.type === "negative").length;

	const summary = getReviewSummary(positiveReviews, negativeReviews, totalReviews);
	
	function getHoverInfo(positiveReviews: number, negativeReviews: number) {
		const positivePercentage = (positiveReviews / negativeReviews) * 100;
	
		return  totalReviews === 0 ? "No reviews yet." : `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
	}
	
	return (
    <div className="right-game-summary">
      <div className="game-image">
        <img className="image-full" src={game.horizontalHeaderImage} alt="" />
      </div>
      {isViewport630 && <div className="game-name-mobile">{game.name}</div>}
      <div className="game-discription">{game.description}</div>
      <div className="game-glance-first">
        <div className="user-reviews">
          <div className="user-reviews-summary">
            <div className="summary-subtitle">All Reviews:</div>
            <div className="summary-column">
              <span
                className={`game-review-summary ${
                  positivePercentage < 75 && positivePercentage > 40
                    ? 'mixed'
                    : positivePercentage >= 75
                      ? 'positive'
                      : positivePercentage >= 40
                        ? 'negative'
                        : ''
                }`}
              >
                {summary || 'N/A'}
              </span>
              <span className="game-review-count">
                {' '}
                ({(positiveReviews + negativeReviews).toLocaleString()})
              </span>
              <span className="review-tooltip">
                {getHoverInfo(
                  positiveReviews,
                  positiveReviews + negativeReviews,
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
            <a href={game.developer.link}>{game.publisher.name}</a>
          </div>
        </div>
      </div>
      <div className="user-defined-tags">
        <div className="glance-tags-label">
          Popular user-defined tags for this product:
        </div>
        {!isViewport960 ? (
          <div className="glance-tags">
            {!showModal &&
              game.tags.slice(0, 4).map((tag, index) => (
                <a
                  key={index}
                  className="game-tag"
                  href={`/search?tags=${tag}`}
                >
                  {tag}
                </a>
              ))}
            {!showModal && game.tags.length > 3 && (
              <a className="game-tag" onClick={toggleModal}>
                +
              </a>
            )}
            {showModal && <TagsModal onClose={toggleModal} tags={game.tags} />}
          </div>
        ) : (
          game.tags.map((tag, index) => (
            <a key={index} className="game-tag" href={`/search?tags=${tag}`}>
              {tag}
            </a>
          ))
        )}
      </div>
    </div>
  );
};
