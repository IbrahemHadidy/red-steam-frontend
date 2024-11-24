// React
import { useRef } from 'react';

// React-Select
import defaultDarkStyles from '@styles/react-select/react-select-dark';
import Select from 'react-select';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  togglePlatform,
  updateFeatures,
  updateLanguages,
  updateTags,
} from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from '../../FormButtons';
import LanguagesTable from './LanguagesTable';

// Form Validation
import { validateSpecifications } from '../../validations';

// APIs
import { useGetAllFeaturesQuery } from '@store/apis/common/features';
import { useGetAllLanguagesQuery } from '@store/apis/common/languages';
import { useGetAllTagsQuery } from '@store/apis/common/tags';

// Types
import type { MultiValue } from 'react-select';

interface ReactSelectOption {
  value: number;
  label: string;
}

export default function Specifications() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { tags, features, languages, platforms } = useAppSelector((state) => state.admin.game);

  // Refs
  const tagsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const languagesTableRef = useRef<HTMLTableElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);

  // Queries
  const { data: fetchedTags } = useGetAllTagsQuery();
  const { data: fetchedFeatures } = useGetAllFeaturesQuery();
  const { data: fetchedLanguages } = useGetAllLanguagesQuery();

  //---------------------------- React-Select Options ---------------------//
  const tagOptions: ReactSelectOption[] =
    fetchedTags?.map((tag) => ({
      value: tag.id,
      label: tag.name,
    })) ?? [];

  const featureOptions: ReactSelectOption[] =
    fetchedFeatures?.map((feature) => ({
      value: feature.id,
      label: feature.name,
    })) ?? [];

  const languageOptions: ReactSelectOption[] =
    fetchedLanguages?.map((language) => ({
      value: language.id,
      label: language.name,
    })) ?? [];

  //---------------------------- Event Handlers ---------------------------//
  const handleTagChange = (selectedOptions: MultiValue<ReactSelectOption>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    dispatch(updateTags(selectedIds));
  };

  const handleFeatureChange = (selectedOptions: MultiValue<ReactSelectOption>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    dispatch(updateFeatures(selectedIds));
  };

  const handleLanguageChange = (selectedOptions: MultiValue<ReactSelectOption>): void => {
    const selectedNames: string[] = selectedOptions.map((option) => option.label);
    dispatch(updateLanguages(selectedNames));
  };

  const handlePlatformChange = (changedPlatform: 'win' | 'mac'): void => {
    togglePlatform(changedPlatform);
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
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

          {languages.length > 0 && <LanguagesTable languagesTableRef={languagesTableRef} />}
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
                onChange={() => handlePlatformChange('win')}
              />
              <span>Windows</span>
            </div>

            <div>
              <input
                type="checkbox"
                checked={platforms.mac}
                onChange={() => handlePlatformChange('mac')}
              />
              <span>Mac</span>
            </div>
          </div>
        </div>
      </section>

      <br />
      <FormButtons
        validation={() =>
          validateSpecifications(
            { tags, features, languages, platforms },
            { tagsRef, featuresRef, languagesRef, languagesTableRef, platformsRef }
          )
        }
      />
    </>
  );
}
