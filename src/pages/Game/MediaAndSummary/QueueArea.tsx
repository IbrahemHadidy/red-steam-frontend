import { FC, useContext } from "react";
import { AuthContext } from 'contexts/AuthContext';
import { gamesData } from "services/gameData";

export const QueueArea: FC<{ game: gamesData }> = ({game}, isViewport630) => {
  	const { isLoggedIn } = useContext(AuthContext);
	// TODO: match the user data with current game and complete the rest of the logic
	return (
		<div className="queue-area">
			{!isLoggedIn && <div className="queue-actions">
				<a href="/login">Sign in</a> to add this item to your wishlist, follow
				it, or mark it as ignored
			</div> }

			{ isLoggedIn &&
			<div className="queue-actions">
				{!isViewport630 && <a className="view-queue-button" href="">
					<span>
						View Your Queue&nbsp;&nbsp;&nbsp;
						<i className="arrow-next" />
					</span>
				</a> }

				{/* TODO: isInLibrary backend logic */}
				<div
					id="add-wishlist"
					className="queue-button-container"
					style={{ display: "inline-block" }}
				>
					<a className="queue-button" href="">
						<span>Add to your wishlist</span>
					</a>
				</div>
				<div
					id="added-wishlist"
					className="queue-button-container"
					style={{ display: "none" }}
				>
					<a className="queue-button" href="">
						<span>
							<img src="/images/ico_selected.png" alt="" /> On Wishlist
						</span>
					</a>
					<div className="wishlist-added"> Item added to your wishlist! </div>
				</div>

				
				<div id="follow" className="queue-button-container">
					{/* TODO: isFollowed backend logic */}
					<div className="queue-button" style={{ display: "inline-block" }}>
						<span>Follow</span>
					</div>
					{/* !isFollowed */}
					<div className="queue-button" style={{ display: "none" }}>
						<span>
							<img src="/images/ico_selected.png" alt="" /> Following
						</span>
					</div>
				</div>

				{/* TODO: isNotIgnored backend logic */}
				<div
					id="ignore"
					className="queue-button-container"
					style={{ display: "inline-block" }}
				>
					<div className="queue-button">
						<span>Ignore</span>
					</div>
				</div>
				{/* !isNotIgnored */}
				<div
					id="ignored"
					className="queue-button-container"
					style={{ display: "none" }}
				>
					<div className="queue-button">
						<span>
							<img src="/images/ico_selected.png" alt="" /> Ignored
						</span>
					</div>
				</div>
			</div>}
		</div>
	);
};
