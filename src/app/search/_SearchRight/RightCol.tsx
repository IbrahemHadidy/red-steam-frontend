// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import FilterBlock from './FilterBlock/FilterBlock';
import PriceFilterBlock from './FilterBlock/PriceFilterBlock';

// Enums
import { FilterTitle } from '@enums/search';

export default function RightCol() {
  const { filters } = useAppSelector((state) => state.search);

  return (
    <div className="search-rightcol">
      <PriceFilterBlock filters={filters.price} />
      <FilterBlock title={FilterTitle.Preference} filters={filters.preferences} />
      <FilterBlock title={FilterTitle.Tag} filters={filters.tags} />
      <FilterBlock title={FilterTitle.Feature} filters={filters.features} />
      <FilterBlock title={FilterTitle.Developer} filters={filters.developers} />
      <FilterBlock title={FilterTitle.Publisher} filters={filters.publishers} />
      <FilterBlock title={FilterTitle.OS} filters={filters.os} />
      <FilterBlock title={FilterTitle.Language} filters={filters.languages} />
    </div>
  );
}
