'use client';

// React
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import LoadingSkeleton from '@app/game/[id]/Skeleton';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';
import AdditionalInfoSection from './AdditionalInfo';
import BasicInfoSection from './BasicInfo';
import CompaniesSection from './Companies';
import MediaSection from './Media';
import PricingSection from './Pricing';
import SpecificationsSection from './Specifications';
import SystemRequirementsSection from './SystemRequirements';
import ThumbnailsSection from './Thumbnails';
const GameContent = dynamic(() => import('@app/game/[id]/_GameContent/layout'));
const MediaAndSummary = dynamic(() => import('@app/game/[id]/_MediaAndSummary/MediaAndSummary'));

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import fileToUrl from '@utils/fileToUrl';
import { validateUrl } from '@utils/inputValidations';

// Services
import { getDevelopers } from '@services/common/developers';
import { getFeatures } from '@services/common/features';
import { getPublishers } from '@services/common/publishers';
import { getTags } from '@services/common/tags';
import { createGame, updateGame } from '@services/game/admin';

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
} from './game-admin.types';
type GameData = Omit<Game, 'languages' | 'totalSales'>;
interface GameAdminProps {
  type: 'create' | 'update';
  game?: Game | null;
}

const GameAdmin: FC<GameAdminProps> = ({ type, game }): JSX.Element => {
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
    mainImage: { file: null, changed: false },
    backgroundImage: { file: null, changed: false },
    menuImg: { file: null, changed: false },
    horizontalHeaderImage: { file: null, changed: false },
    verticalHeaderImage: { file: null, changed: false },
    smallHeaderImage: { file: null, changed: false },
    searchImage: { file: null, changed: false },
    tabImage: { file: null, changed: false },
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

  // Get current game data (for update)
  const getCurrentGameData = useCallback((): void => {
    if (type === 'update' && game) {
      setName(game.name);
      setCategory(game.category);
      setDescription(game.description);
      setReleaseDate(new Date(game.releaseDate));
      setFeatured(game.featured);
      setPublishers(game.publishers?.map((publisher) => publisher.id) || []);
      setDevelopers(game.developers?.map((developer) => developer.id) || []);
      setThumbnails({
        mainImage: { file: game.thumbnailEntries.mainImage, changed: false },
        backgroundImage: { file: game.thumbnailEntries.backgroundImage, changed: false },
        menuImg: { file: game.thumbnailEntries.menuImg, changed: false },
        horizontalHeaderImage: {
          file: game.thumbnailEntries.horizontalHeaderImage,
          changed: false,
        },
        verticalHeaderImage: { file: game.thumbnailEntries.verticalHeaderImage, changed: false },
        smallHeaderImage: { file: game.thumbnailEntries.smallHeaderImage, changed: false },
        searchImage: { file: game.thumbnailEntries.searchImage, changed: false },
        tabImage: { file: game.thumbnailEntries.tabImage, changed: false },
      });
      setScreenshots(
        game.imageEntries.map((image) => ({
          id: `${image.order}:${Date.now()}`,
          image: image.link,
          featured: image.featured,
          order: image.order,
          change: 'unchanged',
        }))
      );
      setVideos(
        game.videoEntries.map((video) => ({
          id: `${video.order}:${Date.now()}`,
          video: video.link,
          poster: video.posterLink,
          order: video.order,
          change: 'unchanged',
        }))
      );
      setPricing({
        free: game.pricing?.free || false,
        price: game.pricing?.price || 0,
      });
      setTags(game.tags?.map((tag) => tag.id) || []);
      setFeatures(game.features?.map((feature) => feature.id) || []);
      setLanguages(game.languageSupport);
      setPlatforms(game.platformEntries);
      setSystemRequirements(game.systemRequirements);
      setLink(game.link || '');
      setAbout(game.about);
      setMature(game.mature);
      setMatureDescription(game.matureDescription);
      setLegal(game.legal);
    }
  }, [game, type]);

  useEffect(() => {
    getCurrentGameData();
  }, [getCurrentGameData]);

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
    if (screenshots.filter((screenshot) => screenshot.featured).length !== 4 && mediaRef.current) {
      mediaRef.current.style.cssText += errorStyle;
      firstInvalidRef = firstInvalidRef || mediaRef;
      toast.warn('Please mark 4 screenshots as featured');
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

  const getUrl = (url: File | string | null) => {
    if (typeof url === 'string') {
      return url;
    } else if (url instanceof File) {
      return URL.createObjectURL(url);
    } else {
      return '';
    }
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
        mainImage: getUrl(thumbnails.mainImage.file),
        verticalHeaderImage: getUrl(thumbnails.verticalHeaderImage.file),
        smallHeaderImage: getUrl(thumbnails.smallHeaderImage.file),
        searchImage: getUrl(thumbnails.searchImage.file),
        tabImage: getUrl(thumbnails.tabImage.file),
        backgroundImage: getUrl(thumbnails.backgroundImage.file),
        menuImg: getUrl(thumbnails.menuImg.file),
        horizontalHeaderImage: getUrl(thumbnails.horizontalHeaderImage.file),
      },
      imageEntries: screenshots
        .filter((entry) => entry.change !== 'deleted')
        .map((entry) => ({
          ...entry,
          link: entry.image instanceof File ? fileToUrl(entry.image) : entry.image,
        })),
      videoEntries: videos
        .filter((entry) => entry.change !== 'deleted')
        .map((entry) => ({
          ...entry,
          link: entry.video instanceof File ? fileToUrl(entry.video) : entry.video,
          posterLink: entry.poster instanceof File ? fileToUrl(entry.poster) : entry.poster,
        })),
      pricing: {
        id: 1,
        free: pricing.free,
        basePrice: pricing.price || 0.0,
        price: pricing.price || 0.0,
      },
      tags: tags.length > 0 ? await getTags(tags) : [],
      features: features.length > 0 ? await getFeatures(features) : [],
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
      ? `url(${getUrl(thumbnails.backgroundImage.file)}) center top no-repeat #1b2838`
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

    if (type === 'create') {
      setName('');
      setCategory('');
      setDescription('');
      setReleaseDate(new Date());
      setFeatured(false);
      setPublishers([]);
      setDevelopers([]);
      setThumbnails({
        mainImage: { file: null, changed: false },
        backgroundImage: { file: null, changed: false },
        menuImg: { file: null, changed: false },
        horizontalHeaderImage: { file: null, changed: false },
        verticalHeaderImage: { file: null, changed: false },
        smallHeaderImage: { file: null, changed: false },
        searchImage: { file: null, changed: false },
        tabImage: { file: null, changed: false },
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
    } else if (type === 'update') {
      getCurrentGameData();
    }

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
      router.push(`/game/${response.id}`);
    } else {
      resetAllWarnings();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGameUpdate = async (): Promise<void> => {
    const response = await updateGame(
      {
        changedThumbnails: {
          mainImage:
            thumbnails.mainImage.file instanceof File && thumbnails.mainImage.changed
              ? thumbnails.mainImage.file
              : undefined,
          backgroundImage:
            thumbnails.backgroundImage.file instanceof File && thumbnails.backgroundImage.changed
              ? thumbnails.backgroundImage.file
              : undefined,
          menuImg:
            thumbnails.menuImg.file instanceof File && thumbnails.menuImg.changed
              ? thumbnails.menuImg.file
              : undefined,
          horizontalHeaderImage:
            thumbnails.horizontalHeaderImage.file instanceof File &&
            thumbnails.horizontalHeaderImage.changed
              ? thumbnails.horizontalHeaderImage.file
              : undefined,
          verticalHeaderImage:
            thumbnails.verticalHeaderImage.file instanceof File &&
            thumbnails.verticalHeaderImage.changed
              ? thumbnails.verticalHeaderImage.file
              : undefined,
          smallHeaderImage:
            thumbnails.smallHeaderImage.file instanceof File && thumbnails.smallHeaderImage.changed
              ? thumbnails.smallHeaderImage.file
              : undefined,
          searchImage:
            thumbnails.searchImage.file instanceof File && thumbnails.searchImage.changed
              ? thumbnails.searchImage.file
              : undefined,
          tabImage:
            thumbnails.tabImage.file instanceof File && thumbnails.tabImage.changed
              ? thumbnails.tabImage.file
              : undefined,
        },
        deletedScreenshots: screenshots
          .filter((screenshot) => screenshot.change === 'deleted')
          .map((screenshot) => Number(screenshot.id.split(':')[0])),
        deletedVideos: videos
          .filter((video) => video.change === 'deleted')
          .map((video) => Number(video.id.split(':')[0])),
        changedScreenshots: screenshots
          .filter(
            (screenshot) =>
              screenshot.change !== 'deleted' &&
              screenshot.change !== 'added' &&
              screenshot.order !== Number(screenshot.id.split(':')[0])
          )
          .map((screenshot) => ({
            oldOrder: Number(screenshot.id.split(':')[0]),
            newOrder: screenshot.order,
          })),
        changedVideos: videos
          .filter(
            (video) =>
              video.change !== 'deleted' &&
              video.change !== 'added' &&
              video.order !== Number(video.id.split(':')[0])
          )
          .map((video) => ({
            oldOrder: Number(video.id.split(':')[0]),
            newOrder: video.order,
          })),
        addedScreenshots: screenshots.filter((screenshot) => screenshot.change === 'added'),
        addedVideos: videos.filter((video) => video.change === 'added'),
        featuredOrders: screenshots
          .filter((screenshot) => screenshot.featured)
          .map((screenshot) => screenshot.order),
      },
      {
        id: game?.id,
        name,
        category: game?.category !== category ? category : undefined,
        description: game?.description !== description ? description : undefined,
        releaseDate: game?.releaseDate !== releaseDate ? releaseDate : undefined,
        featured: game?.featured !== featured ? featured : undefined,
        publishers:
          game?.publishers?.map((publisher) => publisher.id) !== publishers
            ? publishers
            : undefined,
        developers:
          game?.developers?.map((developer) => developer.id) !== developers
            ? developers
            : undefined,
        pricing: {
          free: game?.pricing?.free !== pricing.free ? pricing.free : undefined,
          price: game?.pricing?.price !== pricing.price ? pricing.price : undefined,
        },
        tags: game?.tags?.map((tag) => tag.id) !== tags ? tags : undefined,
        features: game?.features?.map((feature) => feature.id) !== features ? features : undefined,
        languages:
          game?.languageSupport?.map((language) => language.name) !==
          languages.map((language) => language.name)
            ? languages
            : undefined,
        platforms: {
          win: platforms.win,
          mac: platforms.mac,
        },
        link: game?.link !== link ? link : undefined,
        about: game?.about !== about ? about : undefined,
        mature: game?.mature !== mature ? mature : undefined,
        matureDescription:
          game?.matureDescription !== matureDescription ? matureDescription : undefined,
        systemRequirements:
          game?.systemRequirements !== systemRequirements ? systemRequirements : undefined,
        legal: game?.legal !== legal ? legal : undefined,
      }
    );
    if (response.message === 'Game updated successfully') {
      router.push(`/game/${game?.id}`);
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
        if (type === 'update') {
          await toast.promise(handleGameUpdate(), {
            pending: 'Updating game...',
            success: 'Game updated successfully',
            error: 'Failed to update game, please try again',
          });
        } else if (type === 'create') {
          await toast.promise(handleGameCreate(), {
            pending: 'Creating game...',
            success: 'Game created successfully',
            error: 'Failed to create game, please try again',
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {preview && <SecondNavbar />}
      <div className={`game-creation-form ${preview ? 'preview' : ''}`}>
        {!preview ? (
          <>
            <h1 className="form-title">
              {type === 'update' ? `Update Game: ${name}` : 'Create a New Game'}
            </h1>
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
              type={type}
              game={game}
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
          <Suspense fallback={<LoadingSkeleton />}>
            <MediaAndSummary game={gameData as Game} />
            <GameContent game={gameData} />
          </Suspense>
        )}
        {preview && <br />}
        <div className="form-buttons">
          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            onClick={preview ? handleSubmitClick : handlePreviewClick}
            ref={submitRef}
            disabled={isLoading}
          >
            {preview ? (type === 'update' ? 'Update' : 'Create') : 'Preview'}
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

export default GameAdmin;
