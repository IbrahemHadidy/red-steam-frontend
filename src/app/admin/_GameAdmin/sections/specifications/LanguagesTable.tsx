// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { toggleLanguageField } from '@store/features/admin/game/gameAdminSlice';

// Types
import type { Language } from '@custom-types/game-admin';
import type { RefObject } from 'react';

interface LanguagesTableProps {
  languagesTableRef: RefObject<HTMLTableElement | null>;
}

export default function LanguagesTable({ languagesTableRef }: LanguagesTableProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { languages } = useAppSelector((state) => state.admin.game);

  //---------------------------- Event Handlers ---------------------------//
  const handleLanguageCheckboxChange = (
    name: string,
    field: keyof Language,
    value: boolean
  ): void => {
    dispatch(toggleLanguageField({ name, field, value }));
  };

  //------------------------------- Render --------------------------------//
  return (
    <table ref={languagesTableRef}>
      <thead>
        <tr>
          <th>Language</th>
          <th>Interface</th>
          <th>Full Audio</th>
          <th>Subtitles</th>
        </tr>
      </thead>
      <tbody>
        {[...languages]
          .sort((a, b) => (a.fullAudio === b.fullAudio ? 0 : a.fullAudio ? -1 : 1))
          .map((language) => (
            <tr key={language.name}>
              <td>{language.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={language.interface}
                  onChange={(e) =>
                    handleLanguageCheckboxChange(language.name, 'interface', e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={language.fullAudio}
                  onChange={(e) =>
                    handleLanguageCheckboxChange(language.name, 'fullAudio', e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={language.subtitles}
                  onChange={(e) =>
                    handleLanguageCheckboxChange(language.name, 'subtitles', e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
