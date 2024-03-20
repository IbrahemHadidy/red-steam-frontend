import useSoftNavigate from 'hooks/useSoftNavigate';
import "./Queue.scss"

const LoginQueue = () => {
    const navigate = useSoftNavigate();
    return (
      <div className="home-section">
        <div className="home-contents login-queue-content">
          <div className="login-queue">
            <p>Sign in to view personalized recommendations</p>
            <div className="signin-btn-ctn">
              <a
                className="signin-btn"
                href="/login"
                onClick={e => {
                  navigate('/login', e);
                }}
              >
                <span>Sign in</span>
              </a>
              <br />
              <br />
              &nbsp;or&nbsp;
              <a
                href='/join'
                onClick={e => {
                  navigate('/join', e);
                }}
              >
                sign up
              </a>
              &nbsp;and join Steam for free
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginQueue;