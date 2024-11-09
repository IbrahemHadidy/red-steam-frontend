'use client';

// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';
import FormButtons from './FormButtons';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Contants
import { ADMIN_BG } from '@config/constants/backgrounds';

// Components
const FormSkeleton = dynamic(() => import('./Skeleton'));
const MediaAndSummarySkeleton = dynamic(() => import('@app/game/[id]/_MediaAndSummary/Skeleton'));
const GameContentSkeleton = dynamic(() => import('@app/game/[id]/_GameContent/Skeleton'));
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
const MediaAndSummary = dynamic(() => import('@app/game/[id]/_MediaAndSummary/MediaAndSummary'), {
  loading: () => <MediaAndSummarySkeleton />,
});
const GameContent = dynamic(() => import('@app/game/[id]/_GameContent/GameContent'), {
  loading: () => <GameContentSkeleton />,
});

// Utils
import getFileUrl from '@utils/getFileUrl';

export default function GameAdmin() {
  //--------------------------- State Selectors ---------------------------//
  const { type, name, currentPage, thumbnails, previewData } = useAppSelector(
    (state) => state.admin.game
  );

  //--------------------------- Dynamic Background ---------------------------//
  useDynamicBackground(
    // Set game background to selected background thumbnail if in preview mode
    // else set game background to default
    currentPage === 'preview'
      ? `url(${getFileUrl(thumbnails.backgroundImage.file ?? '')}) center top no-repeat #1b2838`
      : ADMIN_BG,
    [thumbnails.backgroundImage, currentPage]
  );

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      {currentPage === 'preview' && <SecondNavbar />}
      <div className={`game-creation-form ${currentPage === 'preview' ? 'preview' : ''}`}>
        {currentPage !== 'preview' ? (
          <>
            <h1 className="form-title">
              {type === 'update' ? `Update ${name}'s Details` : 'Create a New Game'}
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
            <>
              <MediaAndSummary />
              <GameContent />
            </>
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
