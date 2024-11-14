// NextJS
import Image from 'next/image';

// Images
import dropdown from '@images/dropdown.png';

// Types
import type { Dispatch, SetStateAction } from 'react';

interface BlockHeaderProps {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BlockHeader({ title, isOpen, setIsOpen }: BlockHeaderProps) {
  return (
    <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
      <div>Narrow by {title}</div>
      <div className={`filter-header-arrow`}>
        <Image className={isOpen ? 'open' : ''} src={dropdown} height={6} width={10} alt="arrow" />
      </div>
    </div>
  );
}
