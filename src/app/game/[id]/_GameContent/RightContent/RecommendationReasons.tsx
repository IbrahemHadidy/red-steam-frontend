// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function RecommendationReasons() {
  //--------------------------- State Selectors ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { currentGame } = useAppSelector((state) => state.game);

  //--------------------------- Helper Functions --------------------------//
  if (!currentGame) return;
  const getVisibility = () => {
    let isVisible = false;

    if (currentUserData?.tags && currentGame?.tags) {
      const matchingTags = currentUserData.tags.filter((tag) =>
        currentGame.tags?.some((gameTag) => gameTag.id === tag.id)
      );
      if (matchingTags.length >= 3) {
        isVisible = true;
      }
    } else if (currentGame?.averageRating >= 80) {
      isVisible = true;
    }

    return isVisible;
  };

  //--------------------------- Render Section ----------------------------//
  return (
    getVisibility() && (
      <>
        <div className="recommendation-reason">Is this game relevant to you?</div>
        <div className="recommendation-reasons">
          {currentUserData?.tags &&
            currentUserData.tags.filter((tag) =>
              currentGame?.tags?.some((gameTag) => gameTag.id === tag.id)
            ).length >= 3 && (
              <>
                <p className="reason-for">Players like you love this currentGame?.</p>
                <hr />
              </>
            )}
          {currentGame.averageRating >= 90 && (
            <>
              <p className="reason-for">
                User reviews:&nbsp;
                <span className="game-review-summary positive">Overwhelmingly Positive</span>
              </p>
              <hr />
            </>
          )}
          {90 > currentGame.averageRating && currentGame.averageRating >= 80 && (
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
    )
  );
}
