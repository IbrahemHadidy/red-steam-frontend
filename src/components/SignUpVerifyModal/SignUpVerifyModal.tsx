'use client';

// React
import { useEffect, useRef, useState } from 'react';

// React Spring
import { animated, useSpring } from 'react-spring';

// Styles
import '@styles/components/SignUpVerifyModal.scss';

// Types
import type { Dispatch, FC, JSX, SetStateAction } from 'react';
interface Props {
  storedEmailAddress: string;
  setShowVerificationModal: Dispatch<SetStateAction<boolean>>;
  setFirstStep: Dispatch<SetStateAction<boolean>>;
}

export const VerifyModal: FC<Props> = ({
  storedEmailAddress,
  setShowVerificationModal,
  setFirstStep,
}): JSX.Element => {
  // States
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalHeight, setTotalHeight] = useState(0);

  // Refs
  const animatedDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animatedDivRef.current) {
      const children: Element[] = Array.from(animatedDivRef.current.children);
      let sum: number = 0;

      children.forEach((child: Element) => {
        if (child instanceof HTMLElement) {
          sum += child.offsetHeight;
        }
      });

      setTotalHeight(sum);
    }
  }, []);

  const divHeight: string = `${totalHeight + 24}px`;

  const expandSpring = useSpring({
    opacity: isExpanded ? 1 : 0,
    height: isExpanded ? divHeight : '0',
    overflow: 'hidden',
  });

  const handleExpandClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleChangeEmailClick = (): void => {
    setFirstStep(false);
    setShowVerificationModal(false);
  };

  return (
    <>
      <div className="modal-overlay" />
      <div className="verify-modal">
        <div className="top-bar" />
        <div className="title-container">
          <div className="title">Verify Your Email</div>
        </div>
        <div className="content-border">
          <div className="content">
            <div className="verify-dialog">
              <div className="verification-header">
                <div className="verification-subheader">
                  Check&nbsp;
                  <span className="verification-email">{storedEmailAddress}</span>
                  &nbsp;for an email from Red Steam to verify and access your account.
                </div>
                <div className="loadding-wrapper">
                  <div className="throbber">
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className="loading-text">Waiting for you to verify...</div>
                </div>
              </div>
              <div className="verification-missing">
                <div className="email-missing">Haven't gotten our email?</div>
                <div className="expand-btn" onClick={handleExpandClick}>
                  <span>
                    Expand&nbsp;
                    <i className={`${isExpanded && 'flipped'}`} />
                  </span>
                </div>
              </div>
              <animated.div
                className="verification-troubleshooting"
                style={{ ...expandSpring }}
                ref={animatedDivRef}
              >
                <div>
                  If you haven't gotten our email please try the below troubleshooting steps:
                </div>
                <ul>
                  <li>
                    Double check that your email&nbsp;
                    <span>{storedEmailAddress}</span>
                    &nbsp;is accurate and doesn't contain any typos.
                  </li>
                  <li>
                    Please check both your spam and trash folder for an email
                    {/* TODO: add the used domain later */}
                    from "steam.redclone@gmail.com". Sometimes emails can be incorrectly identified
                    as spam by your email provider.
                  </li>
                  <li>
                    Wait a few minutes. Sometimes email servers are slow and can take a bit of time
                    to receive an email.
                  </li>
                </ul>
                <div>
                  Some email providers just don't work with Red Steam. If you're still unable to
                  find our email, we recommend using a different email address on Red Steam.&nbsp;
                  <span className="change-email" onClick={handleChangeEmailClick}>
                    Click here
                  </span>
                  &nbsp;to change your email address.
                </div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
