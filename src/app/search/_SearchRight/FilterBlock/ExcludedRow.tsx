// NextJS
import Image from 'next/image';

// Images
import excludedSearch from '@images/search_checkbox_not.svg';

// Enums
import { FilterCheckType } from '@enums/search';

// Types
import type { Filter } from '@custom-types/search';
import type { MouseEvent } from 'react';

interface ExcludedRowProps {
  row: Filter;
  handleIncludeClick: (row: Filter) => void;
  handleExcludeClick: (e: MouseEvent<HTMLImageElement>, row: Filter) => void;
}

export default function ExcludedRow({
  row,
  handleIncludeClick,
  handleExcludeClick,
}: ExcludedRowProps) {
  return (
    <div
      className={`filter-control-row ${row.check === FilterCheckType.Excluded ? 'excluded' : ''}`}
      onClick={() => handleIncludeClick(row)}
    >
      <span className="filter-tab">
        <span>
          <span className="tab-checkbox" />
          <span className="tab-label">{row.name}</span>
        </span>
      </span>

      {handleExcludeClick && (
        <span className="tab-exclude">
          <Image src={excludedSearch} alt="exclude" onClick={(e) => handleExcludeClick(e, row)} />
        </span>
      )}
    </div>
  );
}
