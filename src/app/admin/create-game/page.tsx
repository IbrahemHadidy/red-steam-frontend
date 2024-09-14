'use client';

// React
import { useCallback, useEffect, useRef, useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';
import AdditionalInfoSection from './_Sections/AdditionalInfo';
import BasicInfoSection from './_Sections/BasicInfo';
import CompaniesSection from './_Sections/Companies';
import MediaSection from './_Sections/Media';
import PricingSection from './_Sections/Pricing';
import SpecificationsSection from './_Sections/Specifications';
import SystemRequirementsSection from './_Sections/SystemRequirements';
import ThumbnailsSection from './_Sections/Thumbnails';
const GameContent = dynamic(() => import('@app/game/[id]/_GameContent/layout'));
const MediaAndSummary = dynamic(() => import('@app/game/[id]/_MediaAndSummary/MediaAndSummary'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import { validateUrl } from '@utils/inputValidations';

// Services
import { getDevelopers } from '@services/common/developers';
import { getFeatures } from '@services/common/features';
import { getPublishers } from '@services/common/publishers';
import { getTags } from '@services/common/tags';
import { createGame } from '@services/game/admin';

// Types
import type { Game } from '@entities/game.entity';
import type { Thumbnails as ServiceThumbnails } from '@services/game/admin';
import type { FC, JSX, MouseEvent, RefObject } from 'react';
import type {
  Language,
  Platforms,
  Pricing,
  Screenshot,
  SystemRequirements as SystemRequirementsType,
  Thumbnails,
  Video,
} from './create-game.types';
type GameData = Omit<Game, 'languages' | 'totalSales'>;

const GameCreate: FC = (): JSX.Element => {
  // Init
  const router = useRouter();

  // States
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());
  const [featured, setFeatured] = useState<boolean>(false);
  const [publishers, setPublishers] = useState<number[]>([]);
  const [developers, setDevelopers] = useState<number[]>([]);
  const [thumbnails, setThumbnails] = useState<Thumbnails>({
    mainImage: null,
    backgroundImage: null,
    menuImg: null,
    horizontalHeaderImage: null,
    verticalHeaderImage: null,
    smallHeaderImage: null,
    searchImage: null,
    tabImage: null,
  });
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [pricing, setPricing] = useState<Pricing>({
    free: true,
  });
  const [tags, setTags] = useState<number[]>([]);
  const [features, setFeatures] = useState<number[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [platforms, setPlatforms] = useState<Platforms>({ win: true, mac: false });
  const [systemRequirements, setSystemRequirements] = useState<SystemRequirementsType>({
    mini: {
      os: '',
      cpu: '',
      ram: '',
      gpu: '',
      dx: '',
      network: '',
      storage: '',
      soundCard: '',
      vrSupport: '',
      additionalNotes: '',
    },
    recommended: {
      os: '',
      cpu: '',
      ram: '',
      gpu: '',
      dx: '',
      network: '',
      storage: '',
      soundCard: '',
      vrSupport: '',
      additionalNotes: '',
    },
  });
  const [link, setLink] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [mature, setMature] = useState<boolean>(false);
  const [matureDescription, setMatureDescription] =
    useState<string>(`<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`);
  const [legal, setLegal] = useState<string>('');
  const [hasduplicateError, setHasDuplicateError] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [gameData, setGameData] = useState<GameData>({} as GameData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const publishersRef = useRef<HTMLDivElement>(null);
  const developersRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const menuImageRef = useRef<HTMLDivElement>(null);
  const horizontalHeaderImageRef = useRef<HTMLDivElement>(null);
  const verticalHeaderImageRef = useRef<HTMLDivElement>(null);
  const smallHeaderImageRef = useRef<HTMLDivElement>(null);
  const searchImageRef = useRef<HTMLDivElement>(null);
  const tabImageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const languagesTableRef = useRef<HTMLTableElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const miniOsRef = useRef<HTMLInputElement>(null);
  const miniCpuRef = useRef<HTMLInputElement>(null);
  const miniRamRef = useRef<HTMLInputElement>(null);
  const miniGpuRef = useRef<HTMLInputElement>(null);
  const miniStorageRef = useRef<HTMLInputElement>(null);
  const recommendedOsRef = useRef<HTMLInputElement>(null);
  const recommendedCpuRef = useRef<HTMLInputElement>(null);
  const recommendedRamRef = useRef<HTMLInputElement>(null);
  const recommendedGpuRef = useRef<HTMLInputElement>(null);
  const recommendedStorageRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const matureDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const legalRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  // Utils
  const errorStyle: string = 'border: 1px solid rgb(255, 82, 82);';
  const resetAllWarnings = (): void => {
    const removeErrorStyle = (
      refs: (
        | RefObject<HTMLTextAreaElement>
        | RefObject<HTMLDivElement>
        | RefObject<HTMLInputElement>
      )[]
    ): void => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.cssText = ref.current.style.cssText.replace(errorStyle, '');
        }
      });
    };

    removeErrorStyle([
      nameRef,
      categoryRef,
      releaseDateRef,
      publishersRef,
      developersRef,
      mainImageRef,
      backgroundImageRef,
      menuImageRef,
      horizontalHeaderImageRef,
      verticalHeaderImageRef,
      smallHeaderImageRef,
      searchImageRef,
      tabImageRef,
      mediaRef,
      priceRef,
      tagsRef,
      featuresRef,
      languagesRef,
      languagesTableRef,
      platformsRef,
      miniOsRef,
      miniCpuRef,
      miniRamRef,
      miniGpuRef,
      miniStorageRef,
      recommendedOsRef,
      recommendedCpuRef,
      recommendedRamRef,
      recommendedGpuRef,
      recommendedStorageRef,
      linkRef,
      aboutRef,
      matureDescriptionRef,
      legalRef,
    ]);
  };

  const getFileUrl = (file: File): string => URL.createObjectURL(file);
  const checkFormValidation = (): boolean => {
    let firstInvalidRef: RefObject<HTMLElement> | undefined;

    if (name === '' && nameRef.current) {
      nameRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || nameRef;
    }
    if (category === '' && categoryRef.current) {
      categoryRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || categoryRef;
    }
    if (description === '' && descriptionRef.current) {
      descriptionRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || descriptionRef;
    }
    if (releaseDate === null && releaseDateRef.current) {
      releaseDateRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || releaseDateRef;
    }
    if (publishers.length === 0 && publishersRef.current) {
      publishersRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || publishersRef;
    }
    if (developers.length === 0 && developersRef.current) {
      developersRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || developersRef;
    }
    if (thumbnails.mainImage === null && mainImageRef.current) {
      mainImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || mainImageRef;
    }
    if (thumbnails.backgroundImage === null && backgroundImageRef.current) {
      backgroundImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || backgroundImageRef;
    }
    if (thumbnails.menuImg === null && menuImageRef.current) {
      menuImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || menuImageRef;
    }
    if (thumbnails.horizontalHeaderImage === null && horizontalHeaderImageRef.current) {
      horizontalHeaderImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || horizontalHeaderImageRef;
    }
    if (thumbnails.verticalHeaderImage === null && verticalHeaderImageRef.current) {
      verticalHeaderImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || verticalHeaderImageRef;
    }
    if (thumbnails.smallHeaderImage === null && smallHeaderImageRef.current) {
      smallHeaderImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || smallHeaderImageRef;
    }
    if (thumbnails.searchImage === null && searchImageRef.current) {
      searchImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || searchImageRef;
    }
    if (thumbnails.tabImage === null && tabImageRef.current) {
      tabImageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || tabImageRef;
    }
    if (
      ((videos.length === 0 && screenshots.length < 4) || hasduplicateError) &&
      mediaRef.current
    ) {
      mediaRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || mediaRef;
    }
    if (hasduplicateError && mediaRef.current) {
      mediaRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || mediaRef;
    }
    if (screenshots.filter((screenshot) => screenshot.featured).length !== 4 && mediaRef.current) {
      toast.error('Please mark 4 screenshots as featured');
      mediaRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || mediaRef;
    }
    if (tags.length < 4 && tagsRef.current) {
      tagsRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || tagsRef;
    }
    if (features.length === 0 && featuresRef.current) {
      featuresRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || featuresRef;
    }
    if (languages.length === 0 && languagesRef.current) {
      languagesRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || languagesRef;
    }
    if (
      languages.some((language) => !language.fullAudio && !language.interface) &&
      languagesTableRef.current
    ) {
      languagesTableRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || languagesTableRef;
    }
    if (platforms.win === false && platforms.mac === false && platformsRef.current) {
      platformsRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || platformsRef;
    }
    if (!systemRequirements.recommended.os && recommendedOsRef.current) {
      recommendedOsRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || recommendedOsRef;
    }
    if (!systemRequirements.recommended.cpu && recommendedCpuRef.current) {
      recommendedCpuRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || recommendedCpuRef;
    }
    if (!systemRequirements.recommended.ram && recommendedRamRef.current) {
      recommendedRamRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || recommendedRamRef;
    }
    if (!systemRequirements.recommended.gpu && recommendedGpuRef.current) {
      recommendedGpuRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || recommendedGpuRef;
    }
    if (!systemRequirements.recommended.storage && recommendedStorageRef.current) {
      recommendedStorageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || recommendedStorageRef;
    }
    if (!systemRequirements.mini.os && miniOsRef.current) {
      miniOsRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || miniOsRef;
    }
    if (!systemRequirements.mini.cpu && miniCpuRef.current) {
      miniCpuRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || miniCpuRef;
    }
    if (!systemRequirements.mini.ram && miniRamRef.current) {
      miniRamRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || miniRamRef;
    }
    if (!systemRequirements.mini.gpu && miniGpuRef.current) {
      miniGpuRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || miniGpuRef;
    }
    if (!systemRequirements.mini.storage && miniStorageRef.current) {
      miniStorageRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || miniStorageRef;
    }
    if (link !== '' && !validateUrl(link) && linkRef.current) {
      linkRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || linkRef;
      toast.warn('Invalid link format');
    }
    if (about.length < 30 && aboutRef.current) {
      aboutRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || aboutRef;
    }

    if (firstInvalidRef) {
      firstInvalidRef === mediaRef
        ? firstInvalidRef.current?.scrollIntoView({ behavior: 'smooth' })
        : firstInvalidRef.current?.parentElement?.scrollIntoView({ behavior: 'smooth' });
      toast.warn('Please fill in all required fields.');
      return false;
    }

    resetAllWarnings();
    return true;
  };

  const getGameData = useCallback(async (): Promise<GameData> => {
    return {
      id: 0,
      name,
      category,
      description,
      releaseDate,
      featured,
      publishers: publishers.length > 0 ? await getPublishers(publishers) : [],
      developers: developers.length > 0 ? await getDevelopers(developers) : [],
      thumbnailEntries: {
        mainImage: (thumbnails.mainImage && URL.createObjectURL(thumbnails.mainImage)) || '',
        verticalHeaderImage:
          (thumbnails.verticalHeaderImage && URL.createObjectURL(thumbnails.verticalHeaderImage)) ||
          '',
        smallHeaderImage:
          (thumbnails.smallHeaderImage && URL.createObjectURL(thumbnails.smallHeaderImage)) || '',
        searchImage: (thumbnails.searchImage && URL.createObjectURL(thumbnails.searchImage)) || '',
        tabImage: (thumbnails.tabImage && URL.createObjectURL(thumbnails.tabImage)) || '',
        backgroundImage:
          (thumbnails.backgroundImage && URL.createObjectURL(thumbnails.backgroundImage)) || '',
        menuImg: (thumbnails.menuImg && URL.createObjectURL(thumbnails.menuImg)) || '',
        horizontalHeaderImage:
          (thumbnails.horizontalHeaderImage &&
            URL.createObjectURL(thumbnails.horizontalHeaderImage)) ||
          '',
      },
      imageEntries: screenshots.map((entry) => ({
        ...entry,
        link: getFileUrl(entry.image),
      })),
      videoEntries: videos.map((entry) => ({
        ...entry,
        link: getFileUrl(entry.video),
        posterLink: getFileUrl(entry.poster),
      })),
      pricing: {
        id: 1,
        free: pricing.free,
        basePrice: pricing.price || 0.0,
        price: pricing.price || 0.0,
      },
      tags: tags.length > 0 ? await getTags(tags) : [],
      gamesFeatures: features.length > 0 ? await getFeatures(features) : [],
      languageSupport: languages,
      platformEntries: platforms,
      link: link === '' ? null : link,
      about,
      mature,
      matureDescription,
      systemRequirements,
      legal,
      reviews: [],
      averageRating: 0,
      reviewsCount: 0,
    };
  }, [
    name,
    category,
    description,
    releaseDate,
    featured,
    publishers,
    developers,
    thumbnails,
    screenshots,
    videos,
    pricing,
    tags,
    features,
    languages,
    platforms,
    link,
    about,
    mature,
    matureDescription,
    systemRequirements,
    legal,
  ]);

  useEffect(() => {
    const fetchGame = async (): Promise<void> => {
      setGameData(await getGameData());
    };
    fetchGame();
  }, [getGameData]);

  useDynamicBackground(
    preview
      ? `url(${thumbnails.backgroundImage && URL.createObjectURL(thumbnails.backgroundImage)}) center top no-repeat #1b2838`
      : `#181A21`,
    [thumbnails.backgroundImage, preview]
  );

  const handleBackClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPreview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setName('');
    setCategory('');
    setDescription('');
    setReleaseDate(new Date());
    setFeatured(false);
    setPublishers([]);
    setDevelopers([]);
    setThumbnails({
      mainImage: null,
      backgroundImage: null,
      menuImg: null,
      horizontalHeaderImage: null,
      verticalHeaderImage: null,
      smallHeaderImage: null,
      searchImage: null,
      tabImage: null,
    });
    setScreenshots([]);
    setVideos([]);
    setPricing({
      free: true,
    });
    setTags([]);
    setFeatures([]);
    setLanguages([]);
    setPlatforms({
      win: false,
      mac: false,
    });
    setSystemRequirements({
      mini: {},
      recommended: {},
    });
    setLink('');
    setAbout('');
    setMature(false);
    setMatureDescription('');
    setLegal('');
    setGameData({} as GameData);
    setPreview(false);

    resetAllWarnings();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (checkFormValidation()) {
      setPreview(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.info('Please preview before submitting.');
    }
  };

  const handleGameCreate = async (): Promise<void> => {
    const response = await createGame(
      gameData,
      thumbnails as ServiceThumbnails,
      screenshots,
      videos
    );
    if (response.message === 'Game created successfully') {
      router.push('/');
    } else {
      resetAllWarnings();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitClick = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (checkFormValidation()) {
      setIsLoading(true);
      try {
        await toast.promise(handleGameCreate(), {
          pending: 'Creating game...',
          success: 'Game created successfully',
          error: 'Failed to create game, please try again',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {preview && <SecondNavbar />}
      <div className="game-creation-form">
        {!preview ? (
          <>
            <h1 className="form-title">Create a New Game</h1>
            <hr />
            <BasicInfoSection
              name={name}
              category={category}
              description={description}
              releaseDate={releaseDate}
              featured={featured}
              setName={setName}
              setCategory={setCategory}
              setDescription={setDescription}
              setReleaseDate={setReleaseDate}
              setFeatured={setFeatured}
              nameRef={nameRef}
              categoryRef={categoryRef}
              descriptionRef={descriptionRef}
              releaseDateRef={releaseDateRef}
            />
            <hr />
            <CompaniesSection
              publishers={publishers}
              setPublishers={setPublishers}
              developers={developers}
              setDevelopers={setDevelopers}
              publishersRef={publishersRef}
              developersRef={developersRef}
            />
            <hr />
            <ThumbnailsSection
              thumbnails={thumbnails}
              setThumbnails={setThumbnails}
              mainImageRef={mainImageRef}
              backgroundImageRef={backgroundImageRef}
              menuImageRef={menuImageRef}
              horizontalHeaderImageRef={horizontalHeaderImageRef}
              verticalHeaderImageRef={verticalHeaderImageRef}
              smallHeaderImageRef={smallHeaderImageRef}
              searchImageRef={searchImageRef}
              tabImageRef={tabImageRef}
            />
            <hr />
            <MediaSection
              screenshots={screenshots}
              setScreenshots={setScreenshots}
              videos={videos}
              setVideos={setVideos}
              mediaRef={mediaRef}
              setHasDuplicateError={setHasDuplicateError}
            />
            <hr />
            <PricingSection
              pricing={pricing}
              setPricing={setPricing}
              link={link}
              setLink={setLink}
              priceRef={priceRef}
              linkRef={linkRef}
            />
            <hr />
            <SpecificationsSection
              tags={tags}
              setTags={setTags}
              features={features}
              setFeatures={setFeatures}
              languages={languages}
              setLanguages={setLanguages}
              platforms={platforms}
              setPlatforms={setPlatforms}
              tagsRef={tagsRef}
              featuresRef={featuresRef}
              languagesRef={languagesRef}
              languagesTableRef={languagesTableRef}
              platformsRef={platformsRef}
            />
            <hr />
            <SystemRequirementsSection
              systemRequirements={systemRequirements}
              setSystemRequirements={setSystemRequirements}
              miniOsRef={miniOsRef}
              miniCpuRef={miniCpuRef}
              miniRamRef={miniRamRef}
              miniGpuRef={miniGpuRef}
              miniStorageRef={miniStorageRef}
              recommendedOsRef={recommendedOsRef}
              recommendedCpuRef={recommendedCpuRef}
              recommendedRamRef={recommendedRamRef}
              recommendedGpuRef={recommendedGpuRef}
              recommendedStorageRef={recommendedStorageRef}
            />
            <hr />
            <AdditionalInfoSection
              about={about}
              setAbout={setAbout}
              mature={mature}
              setMature={setMature}
              matureDescription={matureDescription}
              setMatureDescription={setMatureDescription}
              legal={legal}
              setLegal={setLegal}
              aboutRef={aboutRef}
              matureDescriptionRef={matureDescriptionRef}
              legalRef={legalRef}
            />
          </>
        ) : (
          <>
            <MediaAndSummary game={gameData as Game} />
            <GameContent game={gameData} />
          </>
        )}
        <div className="form-buttons">
          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            onClick={preview ? handleSubmitClick : handlePreviewClick}
            ref={submitRef}
            disabled={isLoading}
          >
            {preview ? 'Submit' : 'Preview'}
            {isLoading && (
              <div className="loading-container">
                <div className="loading-spinner" />
              </div>
            )}
          </button>
          <button type="button" className="reset-button" onClick={handleResetClick}>
            Reset
          </button>
          {preview && (
            <button type="button" className="back-button" onClick={handleBackClick}>
              Back
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GameCreate;
