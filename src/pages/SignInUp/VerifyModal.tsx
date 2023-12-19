import { FC, useState } from "react";

export const VerifyModal: FC<{ storedEmailAddress: string }> = ({
  storedEmailAddress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
                  &nbsp;for an email from Steam to complete your account setup.
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
                  <span>Expand&nbsp;<i /></span>
                </div>
              </div>
              <div
                className="verification-troubleshooting"
                style={{ height: isExpanded ? "auto" : "0" }}
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
                    from "steampowered.com". Sometimes emails can be incorrectly
                    identified as spam by your email provider.r
                  </li>
                  <li>
                    Wait a few minutes. Sometimes email servers are slow and can
                    take a bit of time to receive an email.
                  </li>
                </ul>
                <div>
                  Some email providers just don't work with Steam. If you're
                  still unable to find our email, we recommend using a different
                  email address on Steam.&nbsp;
                  <span className="change-email">Click here</span>&nbsp;to
                  change your email address.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
