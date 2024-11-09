// React
import { useState } from 'react';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

export default function SupportedLanguages() {
  const { currentGame } = useAppSelector((state) => state.game);
  const [showAllLanguages, setShowAllLanguages] = useState<boolean>(false);

  const toggleAllLanguages = (): void => {
    setShowAllLanguages((prevState) => !prevState);
  };

  return (
    <div className="game-details-first">
      <div className="block-title">
        <span> Languages:</span>
      </div>

      <div className="language-table">
        <table className="game-language-options">
          <tbody>
            <tr>
              <th style={{ width: '94px' }}></th>
              <th className="checkcol">Interface</th>
              <th className="checkcol">Full Audio</th>
              <th className="checkcol">Subtitles</th>
            </tr>

            {currentGame &&
              [...currentGame.languageSupport]
                .sort((a, b) => {
                  if (a.fullAudio && !b.fullAudio) return -1;
                  if (!a.fullAudio && b.fullAudio) return 1;
                  return a.name.localeCompare(b.name);
                })
                .map((language, idx) => (
                  <tr
                    key={language.name}
                    style={{
                      display: showAllLanguages || idx < 5 ? 'table-row' : 'none',
                    }}
                  >
                    <td className="game-language-name"> {language.name}</td>
                    <td className="checkcol">{language.interface && <span>✔</span>}</td>
                    <td className="checkcol">{language.fullAudio && <span>✔</span>}</td>
                    <td className="checkcol">{language.subtitles && <span>✔</span>}</td>
                  </tr>
                ))}
          </tbody>
        </table>

        {currentGame &&
          currentGame.languageSupport.length > 5 &&
          (!showAllLanguages ? (
            <a className="all-languages" onClick={toggleAllLanguages}>
              See all {currentGame?.languageSupport.length} supported languages
            </a>
          ) : (
            <a className="all-languages" onClick={toggleAllLanguages}>
              Collapse Languages
            </a>
          ))}
      </div>
    </div>
  );
}
