// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { updateDevelopers, updatePublishers } from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from './FormButtons';

// Form Validation
import { validateCompanies } from './validations';

// React-Select
import defaultDarkStyles from '@styles/react-select/react-select-dark';
import Select from 'react-select';

// APIs
import { useGetAllDevelopersQuery } from '@store/apis/common/developers';
import { useGetAllPublishersQuery } from '@store/apis/common/publishers';

// Types
import type { MultiValue } from 'react-select';

interface ReactSelectOption {
  label: string;
  value: number;
}

export default function Companies() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { publishers, developers } = useAppSelector((state) => state.admin.game);

  //---------------------------- Redux Queries ----------------------------//
  const { data: fetchedDevelopers } = useGetAllDevelopersQuery();
  const { data: fetchedPublishers } = useGetAllPublishersQuery();

  //---------------------- React-Select Container Refs --------------------//
  const publishersRef = useRef<HTMLDivElement>(null);
  const developersRef = useRef<HTMLDivElement>(null);

  //------------------------- React-Select Options ------------------------//
  const developerOptions: ReactSelectOption[] =
    fetchedDevelopers?.map((developer) => ({
      value: developer.id,
      label: developer.name,
    })) ?? [];

  const publisherOptions: ReactSelectOption[] =
    fetchedPublishers?.map((publisher) => ({
      value: publisher.id,
      label: publisher.name,
    })) ?? [];

  //---------------------------- Event Handlers ----------------------------//
  const handleDeveloperChange = (selectedOptions: MultiValue<ReactSelectOption>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    dispatch(updateDevelopers(selectedIds));
  };

  const handlePublisherChange = (selectedOptions: MultiValue<ReactSelectOption>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    dispatch(updatePublishers(selectedIds));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      <section className="section-companies">
        <h2>Companies</h2>

        <div className="split-select">
          <div>
            <div className="form-row">
              <label>Developers</label>
              <p>*Required</p>
            </div>
            <div style={{ borderRadius: '4px' }} ref={developersRef}>
              <Select
                isMulti
                options={developerOptions}
                onChange={handleDeveloperChange}
                value={developerOptions.filter((option) => developers.includes(option.value))}
                isOptionDisabled={() => developers.length >= 8}
                styles={defaultDarkStyles}
                placeholder="Select up to 8 developers..."
              />
            </div>
          </div>

          <div>
            <div className="form-row">
              <label>Publishers</label>
              <p>*Required</p>
            </div>
            <div style={{ borderRadius: '4px' }} ref={publishersRef}>
              <Select
                isMulti
                options={publisherOptions}
                onChange={handlePublisherChange}
                value={publisherOptions.filter((option) => publishers.includes(option.value))}
                isOptionDisabled={() => publishers.length >= 4}
                styles={defaultDarkStyles}
                placeholder="Select up to 4 publishers..."
              />
            </div>
          </div>
        </div>
      </section>

      <br />
      <FormButtons
        validation={() =>
          validateCompanies({ developers, publishers }, { developersRef, publishersRef })
        }
      />
    </>
  );
}
