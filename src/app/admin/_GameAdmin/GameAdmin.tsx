'use client';

// React
import { Suspense } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';
import FormButtons from './FormButtons';

// Components
const FormSkeleton = dynamic(() => import('./Skeleton'));
const PreviewSkeleton = dynamic(() => import('@app/game/[id]/Skeleton'));
const SecondNavbar = dynamic(() => import('@components/SecondNavbar/SecondNavbar'));
const BasicInfoSection = dynamic(() => import('./BasicInfo'), { loading: () => <FormSkeleton /> });
const CompaniesSection = dynamic(() => import('./Companies'), { loading: () => <FormSkeleton /> });
const ThumbnailsSection = dynamic(() => import('./Thumbnails'), {
  loading: () => <FormSkeleton />,
});
const MediaSection = dynamic(() => import('./Media'), { loading: () => <FormSkeleton /> });
const PricingSection = dynamic(() => import('./Pricing'), { loading: () => <FormSkeleton /> });
const SpecificationsSection = dynamic(() => import('./Specifications'), {
  loading: () => <FormSkeleton />,
});
const SystemRequirementsSection = dynamic(() => import('./SystemRequirements'), {
  loading: () => <FormSkeleton />,
});
const AdditionalInfoSection = dynamic(() => import('./AdditionalInfo'), {
  loading: () => <FormSkeleton />,
});
const GameContent = dynamic(() => import('@app/game/[id]/_GameContent/layout'));
const MediaAndSummary = dynamic(() => import('@app/game/[id]/_MediaAndSummary/MediaAndSummary'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import getFileUrl from '@utils/getFileUrl';

export default function GameAdmin() {
  // States
  const { type, name, currentPage, thumbnails, previewData } = useAppSelector(
    (state) => state.gameAdmin
  );

  // Set game background if in preview mode
  useDynamicBackground(
    currentPage === 'preview'
      ? `url(${getFileUrl(thumbnails.backgroundImage.file ?? '')}) center top no-repeat #1b2838`
      : `#181A21`,
    [thumbnails.backgroundImage, currentPage]
  );

  return (
    <>
      {currentPage === 'preview' && <SecondNavbar />}
      <div className={`game-creation-form ${currentPage === 'preview' ? 'preview' : ''}`}>
        {currentPage !== 'preview' ? (
          <>
            <h1 className="form-title">
              {type === 'update' ? `Update Game: ${name}` : 'Create a New Game'}
            </h1>
            <hr />

            {currentPage === 'basic' && <BasicInfoSection />}
            {currentPage === 'companies' && <CompaniesSection />}
            {currentPage === 'thumbnails' && <ThumbnailsSection />}
            {currentPage === 'media' && <MediaSection />}
            {currentPage === 'pricing' && <PricingSection />}
            {currentPage === 'specifications' && <SpecificationsSection />}
            {currentPage === 'systemRequirements' && <SystemRequirementsSection />}
            {currentPage === 'additional' && <AdditionalInfoSection />}
          </>
        ) : (
          previewData && (
            <Suspense fallback={<PreviewSkeleton />}>
              <MediaAndSummary game={previewData} />
              <GameContent game={previewData} />
            </Suspense>
          )
        )}

        {currentPage === 'preview' && (
          <>
            <br />
            <FormButtons />
          </>
        )}
      </div>
    </>
  );
}
