// NextJS
import Image from 'next/image';

// React
import { useEffect, useRef, useState } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { checkFilter, setPriceRange, uncheckFilter } from '@store/features/search/searchSlice';

// Constants
import { PRICE_RANGES } from '@config/constants/search';

// Images
import dropdown from '@images/dropdown.png';

// Types
import type { Filter } from '@custom-types/search';
import type { ChangeEvent, MouseEvent } from 'react';

interface PriceFilterBlockProps {
  filters: Filter[];
}

export default function PriceFilterBlock({ filters }: PriceFilterBlockProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { priceRange } = useAppSelector((state) => state.search);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);

  //----------------------------- Refs ---------------------------------//
  const priceFilterRef = useRef<HTMLDivElement | null>(null);

  // Open the price dropdown on load
  useEffect(() => setIsOpen(true), []);

  // Handle the expanding of the price dropdown
  useEffect(() => {
    setDropdownHeight(priceFilterRef.current?.scrollHeight ?? 0);
  }, [isOpen]);

  //---------------------------- Event Handlers ---------------------------//
  const handlePriceHeaderClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handlePriceChange = (value: number): void => {
    setPriceRange(value);
  };

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPriceRange(Number(e.target.value)));
  };

  const handlePriceRangeMouseUp = (e: MouseEvent<HTMLInputElement>): void => {
    handlePriceChange(Number((e.target as HTMLInputElement).value));
  };

  const handleIncludeClick = (row: Filter): void => {
    if (row.check === 'included') {
      dispatch(uncheckFilter({ filterType: 'price', id: row.id }));
    } else {
      dispatch(checkFilter({ filterType: 'price', check: 'included', id: row.id }));
    }
  };

  //---------------------------- Helper Functions ---------------------------//
  const getPriceRangeLabel = (value: number): string => {
    return PRICE_RANGES[value]?.label ?? '';
  };

  //--------------------------------- Render --------------------------------//
  return (
    <div className="filter-block">
      <div className="filter-header" onClick={handlePriceHeaderClick}>
        <div>Narrow by Price</div>
        <div className={`filter-header-arrow`}>
          <Image
            className={isOpen ? 'open' : ''}
            src={dropdown}
            height={6}
            width={10}
            alt="arrow"
          />
        </div>
      </div>

      <div
        className={`filter-content ${!isOpen ? 'closed' : ''}`}
        style={{
          height: isOpen ? `${dropdownHeight}px` : '0px',
        }}
        ref={priceFilterRef}
      >
        <div className="range-container">
          <div className="range-inner">
            <input
              className="range-input"
              type="range"
              step={1}
              min={0}
              max={13}
              defaultValue={priceRange === 0 ? 0 : (priceRange ?? 13)}
              onChange={handlePriceRangeChange}
              onMouseUp={handlePriceRangeMouseUp}
            />
          </div>
          <div className="range-display">
            {getPriceRangeLabel(priceRange === 0 ? 0 : (priceRange ?? 13))}
          </div>
        </div>

        <div className="block-rule" />

        {filters.map((row) => (
          <div
            key={row.name}
            className={`filter-control-row ${row.check === 'included' ? 'included' : ''} ${
              row.id === 2 && priceRange === 0 ? 'disabled' : ''
            }`}
            onClick={() => handleIncludeClick(row)}
          >
            <span className="filter-tab">
              <span>
                <span className="tab-checkbox" />
                <span className="tab-label">{row.name}</span>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
