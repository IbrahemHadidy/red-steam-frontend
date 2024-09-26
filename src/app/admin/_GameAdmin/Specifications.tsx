// React
import { useEffect, useState } from 'react';

// React-Select
import defaultDarkStyles from '@styles/react-select/react-select-dark';
import Select from 'react-select';

// Services
import { getAllFeatures } from '@services/common/features';
import { getAllLanguages } from '@services/common/languages';
import { getAllTags } from '@services/common/tags';

// Types
import type { Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
import type { MultiValue } from 'react-select';
import type { Language, Platforms } from './game-admin.types';
interface SpecificationsProps {
  tags: number[];
  setTags: Dispatch<SetStateAction<number[]>>;
  features: number[];
  setFeatures: Dispatch<SetStateAction<number[]>>;
  languages: Language[];
  setLanguages: Dispatch<SetStateAction<Language[]>>;
  platforms: Platforms;
  setPlatforms: Dispatch<SetStateAction<Platforms>>;
  tagsRef: RefObject<HTMLDivElement>;
  featuresRef: RefObject<HTMLDivElement>;
  languagesRef: RefObject<HTMLDivElement>;
  languagesTableRef: RefObject<HTMLTableElement>;
  platformsRef: RefObject<HTMLDivElement>;
}
interface FeatchedEntry {
  id: number;
  name: string;
}
interface Option {
  value: number;
  label: string;
}

const Specifications: FC<SpecificationsProps> = ({
  tags,
  setTags,
  features,
  setFeatures,
  languages,
  setLanguages,
  platforms,
  setPlatforms,
  tagsRef,
  featuresRef,
  languagesRef,
  languagesTableRef,
  platformsRef,
}): JSX.Element => {
  const [fetchedTags, setFetchedTags] = useState<FeatchedEntry[]>([]);
  const [fetchedFeatures, setFetchedFeatures] = useState<FeatchedEntry[]>([]);
  const [fetchedLanguages, setFetchedLanguages] = useState<FeatchedEntry[]>([]);

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      const publishers = await getAllTags();
      setFetchedTags(publishers);
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchFeatures = async (): Promise<void> => {
      const features = await getAllFeatures();
      setFetchedFeatures(features);
    };
    fetchFeatures();
  }, []);

  useEffect(() => {
    const fetchLanguages = async (): Promise<void> => {
      const languages = await getAllLanguages();
      setFetchedLanguages(languages);
    };
    fetchLanguages();
  }, []);

  const handleTagChange = (selectedOptions: MultiValue<Option>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    setTags(selectedIds);
  };

  const handleFeatureChange = (selectedOptions: MultiValue<Option>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    setFeatures(selectedIds);
  };

  const handleLanguageChange = (selectedOptions: MultiValue<Option>): void => {
    setLanguages((prevLanguages) => {
      const selectedNames: string[] = selectedOptions.map((option) => option.label);
      const updatedLanguages: Language[] = selectedNames.map((name) => {
        // Find the existing language object if it exists
        const existingLanguage = prevLanguages.find((lang) => lang.name === name);

        // If it exists, retain its properties; otherwise, set default properties
        return existingLanguage ?? { name, interface: false, fullAudio: false, subtitles: false };
      });

      return updatedLanguages;
    });
  };

  const handleLanguageCheckboxChange = (
    languageName: string,
    field: keyof Language,
    value: boolean
  ): void => {
    setLanguages((prevLanguages) =>
      prevLanguages.map((language) =>
        language.name === languageName ? { ...language, [field]: value } : language
      )
    );
  };

  // Options
  const tagOptions: Option[] = fetchedTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const featureOptions: Option[] = fetchedFeatures.map((feature) => ({
    value: feature.id,
    label: feature.name,
  }));

  const languageOptions: Option[] = fetchedLanguages.map((language) => ({
    value: language.id,
    label: language.name,
  }));

  return (
    <section className="section-specifications">
      <h2>Specifications</h2>
      <div className="split-select">
        <div>
          <div className="form-row">
            <label>Tags</label>
            <p>*Required</p>
          </div>
          <div style={{ borderRadius: '4px' }} ref={tagsRef}>
            <Select
              isMulti
              options={tagOptions}
              onChange={handleTagChange}
              value={tagOptions.filter((option) => tags.includes(option.value))}
              styles={defaultDarkStyles}
              placeholder="Please select at least 4 tags..."
            />
          </div>
        </div>
        <div>
          <div className="form-row">
            <label>Features</label>
            <p>*Required</p>
          </div>
          <div style={{ borderRadius: '4px' }} ref={featuresRef}>
            <Select
              isMulti
              options={featureOptions}
              onChange={handleFeatureChange}
              value={featureOptions.filter((option) => features.includes(option.value))}
              styles={defaultDarkStyles}
              placeholder="Select features..."
            />
          </div>
        </div>
      </div>
      <div>
        <div className="form-row">
          <label>Languages</label>
          <p>*Required</p>
        </div>
        <div style={{ borderRadius: '4px' }} ref={languagesRef}>
          <Select
            isMulti
            options={languageOptions}
            onChange={handleLanguageChange}
            value={languageOptions.filter((option) =>
              languages.some((language) => language.name === option.label)
            )}
            styles={defaultDarkStyles}
            placeholder="Select languages..."
          />
        </div>
        {languages.length > 0 && (
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
              {languages
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
        )}
      </div>
      <div className="platform-ctn">
        <div className="form-row">
          <label>Platforms</label>
          <p>*At least one platform is required</p>
        </div>
        <div className="platform-options" ref={platformsRef}>
          <div>
            <input
              type="checkbox"
              checked={platforms.win}
              onChange={() => setPlatforms({ ...platforms, win: !platforms.win })}
            />
            <span>Windows</span>
          </div>
          <div>
            <input
              type="checkbox"
              checked={platforms.mac}
              onChange={() => setPlatforms({ ...platforms, mac: !platforms.mac })}
            />
            <span>Mac</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specifications;
