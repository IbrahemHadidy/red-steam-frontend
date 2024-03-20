import { FC, useContext } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { AuthContext } from 'contexts/AuthContext';
import './BrowseSteam.scss';

const BrowseSteam: FC = () => {
	const navigate = useSoftNavigate();
  const { userData } = useContext(AuthContext);
	const userTags = userData?.tags.join(',');

  return (
    <div className="home-section">
      <div className="home-contents">
        <div className="big-buttons">
          <div className="home-titles" style={{ marginBottom: '10px' }}>
            Browse Steam
          </div>
          <div className="browse-buttons">
            <a
              className="big-button"
              href="/search?sort=Release%20date&price=Any%20Price"
              onClick={e => {
                navigate('/search?sort=Release%20date&price=Any%20Price', e);
              }}
            >
              {' '}
              New Releases{' '}
            </a>
            <a
              className="big-button"
              href="/search?priceOptions=Special%20Offers"
              onClick={e => {
                navigate('/search?priceOptions=Special%20Offers', e);
              }}
            >
              {' '}
              Specials{' '}
            </a>
            <a
              className="big-button"
              href="/search?price=Free"
              onClick={e => {
                navigate('/search?price=Free', e);
              }}
            >
              {' '}
              Free Games{' '}
            </a>
            <a
              className="big-button"
              href={`/search?tags=${userTags}`}
              onClick={e => {
                navigate(`/search?tags=${userTags}`, e);
              }}
            >
              {' '}
              By User Tags{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseSteam;
