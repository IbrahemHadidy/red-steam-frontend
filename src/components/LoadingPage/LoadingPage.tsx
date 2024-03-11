import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <div className="page-loading-container">
      <div className="img-container">
        <img
          className="loading-logo"
          src="/images/loading-logo.png"
          alt="Steam logo"
        />
      </div>
      <div className="loading-spinner" />
    </div>
  );
};

export default LoadingPage;
