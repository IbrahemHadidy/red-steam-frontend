// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Utils
import convertToBase64Image from '@utils/convertToBase64Image';

export default function GameFeatures() {
  const { currentGame } = useAppSelector((state) => state.game);

  return (
    <div className="game-details-first">
      <div className="game-area-features-list">
        {currentGame?.features?.map((feature, idx) => (
          <Link className="game-area-details" href={`/search/${feature.id}`} key={idx}>
            <div className="feature-icon">
              <img src={convertToBase64Image(feature.icon.data)} alt={feature.name} />
            </div>
            <div className="feature-label">{feature.name}</div>
          </Link>
        ))}
      </div>

      <div className="DRM-notice">
        <div>Requires agreement to a 3rd-party EULA</div>
        <div>
          <a>{currentGame?.name} EULA</a>
        </div>
      </div>
    </div>
  );
}
