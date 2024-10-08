// NextJS
import Image from 'next/image';

// Images
import loadingLogo from '@images/loading-logo.png';

// Styles
import '@styles/loading.scss';

// Types
import type { JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className="page-loading-container">
      <div className="img-container">
        <Image className="loading-logo" src={loadingLogo} alt="Steam logo" priority />
      </div>
      <div className="loading-spinner" />
    </div>
  );
};
