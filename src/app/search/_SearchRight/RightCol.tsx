// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import FilterBlock from './FilterBlock/FilterBlock';
import PriceFilterBlock from './FilterBlock/PriceFilterBlock';

export default function RightCol() {
  const { filters } = useAppSelector((state) => state.search);

  return (
    <div className="search-rightcol">
      <PriceFilterBlock filters={filters.price} />
      <FilterBlock title="Preference" filters={filters.preferences} />
      <FilterBlock title="Tag" filters={filters.tags} />
      <FilterBlock title="Feature" filters={filters.features} />
      <FilterBlock title="Developer" filters={filters.developers} />
      <FilterBlock title="Publisher" filters={filters.publishers} />
      <FilterBlock title="OS" filters={filters.os} />
      <FilterBlock title="Language" filters={filters.languages} />
    </div>
  );
}
