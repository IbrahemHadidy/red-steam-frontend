'use client';

// NextJS
import Link from 'next/link';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Constants
import { LOGIN_DESKTOP_BG, LOGIN_MOBILE_BG } from '@config/constants/backgrounds';

// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useResponsiveViewport from '@hooks/useResponsiveViewport';

export default function SignInAndRecovery() {
  //--------------------------- Initializations ---------------------------//
  const isViewport740OrLess = useResponsiveViewport(740);
  useDynamicBackground(!isViewport740OrLess ? LOGIN_DESKTOP_BG : LOGIN_MOBILE_BG, [
    isViewport740OrLess,
  ]);

  //------------------------------- States --------------------------------//
  const { showResetPasswordInterface, isPasswordPage } = useAppSelector(
    (state) => state.user.recovery
  );
  const { type, isLoginFormVisible, isForgotPasswordVisible } = useAppSelector(
    (state) => state.user.login
  );

  //------------------------------- Styles --------------------------------//
  // Styles for the forgot password form
  const styles = {
    opacity: isForgotPasswordVisible ? 1 : 0,
    width: type === 'Name / Password Recovery' ? '366px' : isForgotPasswordVisible ? '317px' : '0',
    paddingLeft: isForgotPasswordVisible ? '14px' : '0px',
    marginLeft: isForgotPasswordVisible ? '14px' : '0px',
  };
  const styles740 = {
    opacity: isForgotPasswordVisible ? 1 : 0,
    height: isForgotPasswordVisible ? '296px' : '0',
    paddingTop: isForgotPasswordVisible ? '14px' : '0px',
    marginTop: isForgotPasswordVisible ? '14px' : '0px',
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <Header />
      <div className="page-content-sign">
        <div className="login-container">
          <div className="new-login">
            <div className="signin-title">
              <div className={`title ${isPasswordPage ? 'password-page' : ''}`}>{type}</div>
            </div>

            <div className={`login-form-container ${isPasswordPage ? 'password-page' : ''}`}>
              {isLoginFormVisible && <LoginForm />}

              <div
                className={`forgot-my-password ${!isPasswordPage ? 'login-page' : 'active'}`}
                style={!isViewport740OrLess ? styles : styles740}
              >
                {showResetPasswordInterface ? <ResetPasswordForm /> : <ForgotPasswordForm />}
              </div>
            </div>
          </div>
        </div>

        <div className="new-user">
          <div className="new-user-item create-acc">
            <div className="headline">New to Steam?</div>

            <Link className="signup-btn" target="_top" href="signup">
              <span>Create an account</span>
            </Link>
          </div>

          <div className="new-user-item">
            <div className="subtext">
              It's free and easy. Discover thousands of
              <br />
              games to play with millions of new friends.
              <br />
              <a className="join-desc" href="https://github.com/IbrahemHadidy/red-steam">
                Learn more about Red Steam
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
