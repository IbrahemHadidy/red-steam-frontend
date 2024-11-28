// React
import { useEffect, useRef, useState } from 'react';

// Sanitization library
import dompurify from 'dompurify';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function SystemRequirements() {
  const sanitize = dompurify.sanitize;

  const { currentGame } = useAppSelector((state) => state.game);
  const [isSysReqExpanded, setIsSysReqExpanded] = useState<boolean>(true);

  const sysReqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sysReqRef.current && sysReqRef.current.scrollHeight >= 250) setIsSysReqExpanded(false);
  }, [sysReqRef]);

  const handleSysReqExpandClick = () => setIsSysReqExpanded(true);

  return (
    <div className="autocollapse-container">
      <div
        className="autocollapse sys-req"
        style={{
          height: isSysReqExpanded ? `${sysReqRef.current?.scrollHeight}px` : '220px',
          overflow: 'hidden',
        }}
        ref={sysReqRef}
      >
        <h2>SYSTEM REQUIREMENTS</h2>
        <div className="sysreq-contents">
          <div className="sysreq-content">
            <div className="mini-req">
              <ul>
                <strong>MINIMUM:</strong>
                <br />
                <ul>
                  {currentGame?.systemRequirements.req64 && (
                    <li>
                      Requires a 64-bit processor and operating system
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.os && (
                    <li>
                      <strong>OS:</strong> {currentGame?.systemRequirements.mini.os}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.cpu && (
                    <li>
                      <strong>Processor:</strong> {currentGame?.systemRequirements.mini.cpu}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.ram && (
                    <li>
                      <strong>Memory:</strong> {currentGame?.systemRequirements.mini.ram}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.gpu && (
                    <li>
                      <strong>Graphics:</strong> {currentGame?.systemRequirements.mini.gpu}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.dx && (
                    <li>
                      <strong>DirectX:</strong> {currentGame?.systemRequirements.mini.dx}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.network && (
                    <li>
                      <strong>Network:</strong> {currentGame?.systemRequirements.mini.network}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.storage && (
                    <li>
                      <strong>Storage:</strong> {currentGame?.systemRequirements.mini.storage}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.soundCard && (
                    <li>
                      <strong>Sound card:</strong>{' '}
                      {currentGame?.systemRequirements.recommended.soundCard}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.vrSupport && (
                    <li>
                      <strong>VR Support:</strong> {currentGame?.systemRequirements.mini.vrSupport}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.mini.additionalNotes && (
                    <li>
                      <strong>Additional Notes:</strong>{' '}
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof window !== 'undefined'
                              ? sanitize(currentGame?.systemRequirements.mini.additionalNotes)
                              : currentGame?.systemRequirements.mini.additionalNotes,
                        }}
                      />
                      <br />
                    </li>
                  )}
                </ul>
              </ul>
            </div>

            <div className="recommeded-req">
              <ul>
                <strong>RECOMMENDED:</strong>
                <br />
                <ul>
                  {currentGame?.systemRequirements.req64 && (
                    <li>
                      Requires a 64-bit processor and operating system
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.os && (
                    <li>
                      <strong>OS:</strong> {currentGame?.systemRequirements.recommended.os}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.cpu && (
                    <li>
                      <strong>Processor:</strong> {currentGame?.systemRequirements.recommended.cpu}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.ram && (
                    <li>
                      <strong>Memory:</strong> {currentGame?.systemRequirements.recommended.ram}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.gpu && (
                    <li>
                      <strong>Graphics:</strong> {currentGame?.systemRequirements.recommended.gpu}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.dx && (
                    <li>
                      <strong>DirectX:</strong> {currentGame?.systemRequirements.recommended.dx}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.network && (
                    <li>
                      <strong>Network:</strong>{' '}
                      {currentGame?.systemRequirements.recommended.network}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.storage && (
                    <li>
                      <strong>Storage:</strong>{' '}
                      {currentGame?.systemRequirements.recommended.storage}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.soundCard && (
                    <li>
                      <strong>Sound card:</strong>{' '}
                      {currentGame?.systemRequirements.recommended.soundCard}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.vrSupport && (
                    <li>
                      <strong>VR Support:</strong>{' '}
                      {currentGame?.systemRequirements.recommended.vrSupport}
                      <br />
                    </li>
                  )}
                  {currentGame?.systemRequirements.recommended.additionalNotes && (
                    <li>
                      <strong>Additional Notes:</strong>{' '}
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof window !== 'undefined'
                              ? sanitize(
                                  currentGame?.systemRequirements.recommended.additionalNotes
                                )
                              : currentGame?.systemRequirements.recommended.additionalNotes,
                        }}
                      />
                      <br />
                    </li>
                  )}
                </ul>
              </ul>
            </div>
          </div>
        </div>

        <div className={`autocollapse-fade ${isSysReqExpanded ? 'hidden' : ''}`}>
          <div className="autocollapse-readmore" onClick={handleSysReqExpandClick}>
            READ MORE
          </div>
        </div>
      </div>
    </div>
  );
}
