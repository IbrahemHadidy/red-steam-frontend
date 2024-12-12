'use client';

// React
import { useEffect, useState } from 'react';

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
const SecondNavbar = dynamic(() => import('@components/SecondNavbar/SecondNavbar'));
const BasicInfoSection = dynamic(() => import('./sections/BasicInfo'), {
  loading: () => <FormSkeleton />,
});
const CompaniesSection = dynamic(() => import('./sections/Companies'), {
  loading: () => <FormSkeleton />,
});
const ThumbnailsSection = dynamic(() => import('./sections/Thumbnails'), {
  loading: () => <FormSkeleton />,
});
const MediaSection = dynamic(() => import('./sections/media/Media'), {
  loading: () => <FormSkeleton />,
});
const PricingSection = dynamic(() => import('./sections/Pricing'), {
  loading: () => <FormSkeleton />,
});
const SpecificationsSection = dynamic(() => import('./sections/specifications/Specifications'), {
  loading: () => <FormSkeleton />,
});
const SystemRequirementsSection = dynamic(
  () => import('./sections/system-requirements/SystemRequirements'),
  {
    loading: () => <FormSkeleton />,
  }
);
const AdditionalInfoSection = dynamic(() => import('./sections/AdditionalInfo'), {
  loading: () => <FormSkeleton />,
});
const MediaAndSummary = dynamic(() => import('@app/game/[id]/_MediaAndSummary/MediaAndSummary'), {
  loading: () => <MediaAndSummarySkeleton />,
});
const GameContent = dynamic(() => import('@app/game/[id]/_GameContent/GameContent'), {
  loading: () => <GameContentSkeleton />,
});

// Skeletons
import GameContentSkeleton from '@app/game/[id]/_GameContent/Skeleton';
import MediaAndSummarySkeleton from '@app/game/[id]/_MediaAndSummary/Skeleton';
import FormSkeleton from './Skeleton';

// Utils
import getFileUrl from '@utils/getFileUrl';

// Enums
import { CurrentGameAdminPage, GameAdminType } from '@enums/admin';

export default function GameAdmin() {
  //------------------------------- States --------------------------------//
  const { type, name, currentPage, thumbnails, previewData } = useAppSelector(
    (state) => state.admin.game
  );

  //--------------------------- Dynamic Background ---------------------------//
  const [background, setBackground] = useState<string>(ADMIN_BG);

  useEffect(() => {
    (async () => {
      setBackground(await getFileUrl(thumbnails.backgroundImage.file ?? ''));
    })();
  }, [thumbnails.backgroundImage.file]);

  useDynamicBackground(
    currentPage === CurrentGameAdminPage.PREVIEW
      ? `url(${background}) center top no-repeat #1b2838`
      : ADMIN_BG,
    [thumbnails.backgroundImage, currentPage]
  );

  //------------------------------- Render --------------------------------//
  return (
    <>
      {currentPage === CurrentGameAdminPage.PREVIEW && <SecondNavbar />}
      <div
        className={`game-creation-form ${currentPage === CurrentGameAdminPage.PREVIEW ? 'preview' : ''}`}
      >
        {currentPage !== CurrentGameAdminPage.PREVIEW ? (
          <>
            <h1 className="form-title">
              {type === GameAdminType.UPDATE ? `Update ${name}'s Details` : 'Create a New Game'}
            </h1>
            <hr />

            {currentPage === CurrentGameAdminPage.BASIC && <BasicInfoSection />}
            {currentPage === CurrentGameAdminPage.COMPANIES && <CompaniesSection />}
            {currentPage === CurrentGameAdminPage.THUMBNAILS && <ThumbnailsSection />}
            {currentPage === CurrentGameAdminPage.MEDIA && <MediaSection />}
            {currentPage === CurrentGameAdminPage.PRICING && <PricingSection />}
            {currentPage === CurrentGameAdminPage.SPECIFICATIONS && <SpecificationsSection />}
            {currentPage === CurrentGameAdminPage.SYSTEM_REQUIREMENTS && (
              <SystemRequirementsSection />
            )}
            {currentPage === CurrentGameAdminPage.ADDITIONAL_INFO && <AdditionalInfoSection />}
          </>
        ) : (
          previewData && (
            <>
              <MediaAndSummary />
              <GameContent />
            </>
          )
        )}

        {currentPage === CurrentGameAdminPage.PREVIEW && (
          <>
            <br />
            <FormButtons />
          </>
        )}
      </div>
    </>
  );
}
