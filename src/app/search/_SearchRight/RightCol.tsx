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
      <FilterBlock title={FilterTitle.PREFERENCE} filters={filters.preferences} />
      <FilterBlock title={FilterTitle.TAG} filters={filters.tags} />
      <FilterBlock title={FilterTitle.FEATURE} filters={filters.features} />
      <FilterBlock title={FilterTitle.DEVELOPER} filters={filters.developers} />
      <FilterBlock title={FilterTitle.PUBLISHER} filters={filters.publishers} />
      <FilterBlock title={FilterTitle.OS} filters={filters.os} />
      <FilterBlock title={FilterTitle.LANGUAGE} filters={filters.languages} />
    </div>
  );
}
