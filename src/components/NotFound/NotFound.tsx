import { FC, useEffect } from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import './NotFound.scss';

const NotFound: FC = () => {
  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow = 'hidden';
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <Header />
      <div className="not-found">
        <img
          src="images/glitch-image.png"
          alt="Page Not Found"
          className="not-found-image"
        />
        <div className="not-found-content">
          <h1 className="not-found-heading" data-text="404">
            404
          </h1>
          <p className="not-found-text" data-text="Oops! Page Not Found">
            Oops! Page Not Found
          </p>
          <p
            className="not-found-text"
            data-text="The page you're looking for could not be found."
          >
            The page you're looking for could not be found.
          </p>
          <p
            className="not-found-text"
            data-text="It seems like you've wandered into uncharted territory."
          >
            It seems like you've wandered into uncharted territory.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
