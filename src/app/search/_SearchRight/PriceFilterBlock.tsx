// React
import { useEffect, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';

// Images
import dropdown from '@images/dropdown.png';

// Types
import type { ChangeEvent, JSX, MouseEvent } from 'react';
import type { Filter, PriceFilterBlockProps } from '../Search.types';

export default function PriceFilterBlock({
  filters,
  rangeValue,
  setRangeValue,
  handlePriceChange,
  handlePriceRowClick,
  getPriceRangeLabel,
}: PriceFilterBlockProps): JSX.Element {
  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);

  // Refs
  const priceFilterRef = useRef<HTMLDivElement | null>(null);

  // Add the dropdowns you want to be openend as default here
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Handle the expanding of the price dropdown
  useEffect(() => {
    setDropdownHeight(priceFilterRef.current?.scrollHeight ?? 0);
  }, [isOpen]);

  const handlePriceHeaderClick = (): void => {
    setIsOpen(!isOpen);
  };

  const handlePriceRangeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRangeValue(Number(e.target.value));
  };

  const handlePriceRangeMouseUp = (e: MouseEvent<HTMLInputElement>): void => {
    handlePriceChange(Number((e.target as HTMLInputElement).value));
  };

  const handlePriceIncludeClick = (row: Filter): void => {
    handlePriceRowClick({
      id: row.id,
      name: row.name,
      check: row.check,
    });
  };

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
              defaultValue={rangeValue === 0 ? 0 : rangeValue || 13}
              onChange={handlePriceRangeChange}
              onMouseUp={handlePriceRangeMouseUp}
            />
          </div>
          <div className="range-display">
            {getPriceRangeLabel(rangeValue === 0 ? 0 : rangeValue || 13)}
          </div>
        </div>
        <div className="block-rule" />
        {filters.map((row) => (
          <div
            key={row.name}
            className={`filter-control-row ${row.check === 'included' ? 'checked' : ''} ${
              row.id === 2 && rangeValue === 0 ? 'disabled' : ''
            }`}
            onClick={() => handlePriceIncludeClick(row)}
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
