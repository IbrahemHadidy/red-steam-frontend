'use client';

// React
import { useEffect } from 'react';

// NextJS
import Link from 'next/link';

// React Spring
import { animated, useSpring } from 'react-spring';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { checkPageType } from '@store/features/user/recovery/recoverySlice';

// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useResponsiveViewport from '@hooks/useResponsiveViewport';

interface SignInAndRecoveryProps {
  type: 'Sign In' | 'Password Reset' | 'Name / Password Recovery';
}

export default function SignInAndRecovery({ type }: SignInAndRecoveryProps) {
  // Init
  const dispatch = useAppDispatch();
  const isViewport740 = useResponsiveViewport(740);
  useDynamicBackground(
    !isViewport740
      ? "radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url('/images/new_login_bg_strong_mask.jpg') center top no-repeat, #181A21"
      : "radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url( '/images/new_login_bg_strong_mask_mobile.jpg' ) center top no-repeat, #181A21",
    [isViewport740]
  );

  // States
  const { isLoginFormVisible, isForgotPasswordVisible } = useAppSelector((state) => state.login);
  const { showResetPasswordInterface, isPasswordPage } = useAppSelector((state) => state.recovery);

  // Spring amimation of the "forgot-my-password" section
  const springProps = useSpring({
    opacity: isForgotPasswordVisible ? 1 : 0,
    width: isForgotPasswordVisible ? '295px' : '0',
    paddingLeft: isForgotPasswordVisible ? '14px' : '0px',
    marginLeft: isForgotPasswordVisible ? '14px' : '0px',
    overflow: 'hidden',
  });
  const springProps740 = useSpring({
    opacity: isForgotPasswordVisible ? 1 : 0,
    height: isForgotPasswordVisible ? '280.5px' : '0',
    paddingTop: isForgotPasswordVisible ? '14px' : '0px',
    marginTop: isForgotPasswordVisible ? '14px' : '0px',
    overflow: 'hidden',
  });

  // Handle password reset page and forgot password page UI
  useEffect(() => {
    dispatch(checkPageType(type));
  }, [dispatch, type]);

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
              <animated.div
                className={`forgot-my-password ${!isPasswordPage ? 'login-page' : 'active'}`}
                style={!isViewport740 ? springProps : springProps740}
              >
                {showResetPasswordInterface ? <ResetPasswordForm /> : <ForgotPasswordForm />}
              </animated.div>
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
