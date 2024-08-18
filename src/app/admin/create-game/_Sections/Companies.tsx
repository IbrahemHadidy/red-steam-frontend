// React
import { useEffect, useState } from 'react';

// React-Select
import Select from 'react-select';
import defaultDarkStyles from 'styles/react-select/react-select-dark';

// Services
import { getAllDevelopers } from 'services/common/developers';
import { getAllPublishers } from 'services/common/publishers';

// Types
import type { Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
import type { MultiValue } from 'react-select';
interface CompaniesProps {
  publishers: number[];
  setPublishers: Dispatch<SetStateAction<number[]>>;
  developers: number[];
  setDevelopers: Dispatch<SetStateAction<number[]>>;
  developersRef: RefObject<HTMLDivElement>;
  publishersRef: RefObject<HTMLDivElement>;
}
interface FetchedCompany {
  id: number;
  name: string;
}
interface Option {
  label: string;
  value: number;
}

const Companies: FC<CompaniesProps> = ({
  publishers,
  setPublishers,
  developers,
  setDevelopers,
  developersRef,
  publishersRef,
}): JSX.Element => {
  const [fetchedPublishers, setFetchedPublishers] = useState<FetchedCompany[]>([]);
  const [fetchedDevelopers, setFetchedDevelopers] = useState<FetchedCompany[]>([]);

  useEffect(() => {
    const fetchPublishers = async (): Promise<void> => {
      const publishers = await getAllPublishers();
      setFetchedPublishers(publishers);
    };
    fetchPublishers();
  }, []);

  useEffect(() => {
    const fetchDevelopers = async (): Promise<void> => {
      const developers: FetchedCompany[] = await getAllDevelopers();
      setFetchedDevelopers(developers);
    };
    fetchDevelopers();
  }, []);

  const handleDeveloperChange = (selectedOptions: MultiValue<Option>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    setDevelopers(selectedIds);
  };

  const handlePublisherChange = (selectedOptions: MultiValue<Option>): void => {
    const selectedIds: number[] = selectedOptions.map((option) => option.value);
    setPublishers(selectedIds);
  };

  // Options
  const developerOptions: Option[] = fetchedDevelopers.map((developer) => ({
    value: developer.id,
    label: developer.name,
  }));

  const publisherOptions: Option[] = fetchedPublishers.map((publisher) => ({
    value: publisher.id,
    label: publisher.name,
  }));

  return (
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
              isOptionDisabled={() => publishers.length >= 2}
              styles={defaultDarkStyles}
              placeholder="Select up to 2 publishers..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
