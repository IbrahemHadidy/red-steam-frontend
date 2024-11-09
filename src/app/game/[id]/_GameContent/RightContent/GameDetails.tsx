// React
import { Fragment } from 'react';

// NextJS
import Image from 'next/image';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Utils
import formatDate from '@utils/formatDate';

// Images
import externalLinkIcon from '@images/ico_external_link.gif';

export default function GameDetails() {
  const { currentGame } = useAppSelector((state) => state.game);

  return (
    <div className="game-details-second">
      <div className="details-block">
        <b>Title: </b>&nbsp;
        {currentGame?.name}
        <br />
        <b>Genre: </b>&nbsp;
        {currentGame?.tags && (
          <span>
            <a>{currentGame?.tags[0].name}</a>,&nbsp;
            <a>{currentGame?.tags[1].name}</a>,&nbsp;
            <a>{currentGame?.tags[2].name}</a>,&nbsp;
            <a>{currentGame?.tags[3].name}</a>
          </span>
        )}
        <div className="dev-row">
          <b>Developers:</b>&nbsp;
          {currentGame?.developers?.map((developer, idx) => (
            <Fragment key={developer.id}>
              <a href={developer.website}>{developer.name}</a>
              {currentGame?.developers && idx < currentGame?.developers?.length - 1 && ', '}
            </Fragment>
          ))}
        </div>
        <div className="dev-row">
          <b>Publishers:</b>&nbsp;
          {currentGame?.publishers?.map((publisher, idx) => (
            <Fragment key={publisher.id}>
              <a href={publisher.website}>{publisher.name}</a>
              {currentGame?.publishers && idx < currentGame?.publishers?.length - 1 && ', '}
            </Fragment>
          ))}
        </div>
        <b>Release Date:</b>&nbsp;{formatDate(currentGame?.releaseDate)}
        <br />
      </div>

      <div className="details-block" style={{ paddingTop: '14px' }}>
        {currentGame?.link && (
          <a
            className="linkbar"
            href={currentGame?.link}
            target="_blank"
            rel="noreferrer noopenner"
          >
            {' '}
            Visit the website{' '}
            <Image src={externalLinkIcon} width={12} height={9} alt="external link" />
          </a>
        )}
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          View update history{' '}
        </a>
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          Read related news{' '}
        </a>
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          View discussions{' '}
        </a>
        <a className="linkbar" onClick={() => toast.info('Coming Soon!')}>
          {' '}
          Find Community Groups{' '}
        </a>
      </div>
    </div>
  );
}
