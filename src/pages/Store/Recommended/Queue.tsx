import { FC } from "react";
import { toast } from 'react-toastify';
import useResponsiveViewports from "hooks/useResponsiveViewports";
import queueGames from "services/queueGames";
import "./Queue.scss";

interface queueGame {
	imageNumber: string;
	imageLink: string;
}

const Queue: FC = () => {
	const isViewport960 = useResponsiveViewports(960);

	return (
		<div className="home-section">
			<div className="home-contents">
				<h2 className="main-btn-title">YOUR DISCOVERY QUEUE</h2>
				<div className="static-queue">
					<a className="static-queue-link" href="#" onClick={(e) => {e.preventDefault(); {toast.info("Coming Soon!")}}}>
						{isViewport960 ? (
							<div className="begin-explore-mobile">
								<div className="begin-explore-mobile-btn">
									Explore Your Queue
								</div>
							</div>
						) : (
							<div className="begin-explore">
								Click here to begin exploring your queue
							</div>
						)}
					</a>
					<div className="queue-items">
						{queueGames.map((queueItem: queueGame, index: number) => (
							<div className={`queue-item queue-item-${queueItem.imageNumber}`}  key={index}>
								<div className="queue-item-overlay"></div>
								<img
									className="queue-item-img"
									src={queueItem.imageLink}
								></img>
							</div>
						))}
						<div className="queue-item queue-item-1">
							<div className="queue-item-overlay"></div>
							<img
								className="queue-item-img"
								src="https://cdn.cloudflare.steamstatic.com/steam/apps/2375550/header.jpg"
							></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Queue;
