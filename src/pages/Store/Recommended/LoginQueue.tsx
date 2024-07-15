'use client';

// Next.ks
import Link from 'next/link';

// Styles
import './Queue.scss';

const LoginQueue = () => {
  return (
    <div className="home-section">
      <div className="home-contents login-queue-content">
        <div className="login-queue">
          <p>Sign in to view personalized recommendations</p>
          <div className="signin-btn-ctn">
            <Link className="signin-btn" href="/login">
              <span>Sign in</span>
            </Link>
            <br />
            <br />
            &nbsp;or&nbsp;
            <Link href="/join">sign up</Link>
            &nbsp;and join Steam for free
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginQueue;
