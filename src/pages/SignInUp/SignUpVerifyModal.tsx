import {
  FC,
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { animated, useSpring } from 'react-spring';
import "./SignUpVerifyModal.scss"

export const VerifyModal: FC<{
  storedEmailAddress: string;
  setShowVerificationModal: Dispatch<SetStateAction<boolean>>;
  setFirstStep: Dispatch<SetStateAction<boolean>>;
}> = ({ storedEmailAddress, setShowVerificationModal, setFirstStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalHeight, setTotalHeight] = useState(0);
  const animatedDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animatedDivRef.current) {
      const children = Array.from(animatedDivRef.current.children);
      let sum = 0;

      children.forEach(child => {
        sum += (child as HTMLDivElement).offsetHeight;
      });

      setTotalHeight(sum);
    }
  }, []);

  const divHeight = `${totalHeight + 24}px`;

  const expandSpring = useSpring({
    opacity: isExpanded ? 1 : 0,
    height: isExpanded ? divHeight : '0',
    overflow: 'hidden',
  });

  return (
    <>
      <div className="modal-overlay"></div>
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
                  <span className="verification-email">
                    {storedEmailAddress}
                  </span>
                  &nbsp;for an email from Red Steam to verify and access your
                  account.
                </div>
                <div className="loadding-wrapper">
                  <div className="throbber">
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className="loading-text">
                    Waiting for you to verify...
                  </div>
                </div>
              </div>
              <div className="verification-missing">
                <div className="email-missing">Haven't gotten our email?</div>
                <div
                  className="expand-btn"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
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
                  If you haven't gotten our email please try the below
                  troubleshooting steps:
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
                    from "steam.redclone@gmail.com". Sometimes emails can be
                    incorrectly identified as spam by your email provider.
                  </li>
                  <li>
                    Wait a few minutes. Sometimes email servers are slow and can
                    take a bit of time to receive an email.
                  </li>
                </ul>
                <div>
                  Some email providers just don't work with Red Steam. If you're
                  still unable to find our email, we recommend using a different
                  email address on Red Steam.&nbsp;
                  <span
                    className="change-email"
                    onClick={() => {
                      setShowVerificationModal(false);
                      setFirstStep(false);
                    }}
                  >
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
