import { validateUrl } from '@utils/inputValidations';
import { toast } from 'react-toastify';

// Types
import type { RefObject } from 'react';
import type {
  Language,
  Platforms,
  Pricing,
  Screenshot,
  SystemRequirements,
  Thumbnails,
} from './game-admin.types';

// Error style
const errorStyle = 'border: 1px solid rgb(255, 82, 82);';

// Add error style to element
const addErrorStyle = (
  element: RefObject<HTMLDivElement | HTMLInputElement | HTMLTextAreaElement | null>
) => {
  if (element.current) element.current.style.cssText += errorStyle;
};

// Remove error style from elements
const removeErrorStyles = (
  elements: RefObject<HTMLDivElement | HTMLInputElement | HTMLTextAreaElement | null>[]
) => {
  elements.forEach((element) => {
    if (element.current) element.current.style.cssText = '';
  });
};

// Validate basic info section
export const validateBasicInfo = (
  data: { name: string; category: string; description: string; releaseDate: string },
  refs: {
    nameRef: RefObject<HTMLInputElement | null>;
    categoryRef: RefObject<HTMLInputElement | null>;
    descriptionRef: RefObject<HTMLTextAreaElement | null>;
    releaseDateRef: RefObject<HTMLInputElement | null>;
  }
): boolean => {
  const { name, category, description, releaseDate } = data;
  const { nameRef, categoryRef, descriptionRef, releaseDateRef } = refs;

  if (name === '' && nameRef.current) addErrorStyle(nameRef);
  if (category === '' && categoryRef.current) addErrorStyle(categoryRef);
  if (description === '' && descriptionRef.current) addErrorStyle(descriptionRef);
  if (releaseDate === null && releaseDateRef.current) addErrorStyle(releaseDateRef);

  if (name === '' || category === '' || description === '' || releaseDate === null) {
    toast.warn('Please fill in all required fields.');
    return false;
  } else {
    // Reset error styles
    removeErrorStyles([nameRef, categoryRef, descriptionRef, releaseDateRef]);
    return true;
  }
};

// Validate companies section
export const validateCompanies = (
  data: { publishers: number[]; developers: number[] },
  refs: {
    publishersRef: RefObject<HTMLDivElement | null>;
    developersRef: RefObject<HTMLDivElement | null>;
  }
): boolean => {
  const { publishers, developers } = data;
  const { publishersRef, developersRef } = refs;

  if (publishers.length === 0 && publishersRef.current) addErrorStyle(publishersRef);
  if (developers.length === 0 && developersRef.current) addErrorStyle(developersRef);

  if (publishers.length === 0 || developers.length === 0) {
    toast.warn('Please select at least one developer and publisher');
    return false;
  } else {
    // Reset error styles
    removeErrorStyles([publishersRef, developersRef]);
    return true;
  }
};

// Validate thumbnails section
export const validateThumbnails = (
  thumbnails: Thumbnails,
  refs: {
    mainImageRef: RefObject<HTMLDivElement | null>;
    backgroundImageRef: RefObject<HTMLDivElement | null>;
    menuImageRef: RefObject<HTMLDivElement | null>;
    horizontalHeaderImageRef: RefObject<HTMLDivElement | null>;
    verticalHeaderImageRef: RefObject<HTMLDivElement | null>;
    smallHeaderImageRef: RefObject<HTMLDivElement | null>;
    searchImageRef: RefObject<HTMLDivElement | null>;
    tabImageRef: RefObject<HTMLDivElement | null>;
  }
): boolean => {
  const {
    mainImageRef,
    backgroundImageRef,
    menuImageRef,
    horizontalHeaderImageRef,
    verticalHeaderImageRef,
    smallHeaderImageRef,
    searchImageRef,
    tabImageRef,
  } = refs;

  if (thumbnails.mainImage.file === null && mainImageRef.current) addErrorStyle(mainImageRef);
  if (thumbnails.backgroundImage.file === null && backgroundImageRef.current)
    addErrorStyle(backgroundImageRef);
  if (thumbnails.menuImg.file === null && menuImageRef.current) addErrorStyle(menuImageRef);
  if (thumbnails.horizontalHeaderImage.file === null && horizontalHeaderImageRef.current)
    addErrorStyle(horizontalHeaderImageRef);
  if (thumbnails.verticalHeaderImage.file === null && verticalHeaderImageRef.current)
    addErrorStyle(verticalHeaderImageRef);
  if (thumbnails.smallHeaderImage.file === null && smallHeaderImageRef.current)
    addErrorStyle(smallHeaderImageRef);
  if (thumbnails.searchImage.file === null && searchImageRef.current) addErrorStyle(searchImageRef);
  if (thumbnails.tabImage.file === null && tabImageRef.current) addErrorStyle(tabImageRef);

  if (
    thumbnails.mainImage.file === null ||
    thumbnails.backgroundImage.file === null ||
    thumbnails.menuImg.file === null ||
    thumbnails.horizontalHeaderImage.file === null ||
    thumbnails.verticalHeaderImage.file === null ||
    thumbnails.smallHeaderImage.file === null ||
    thumbnails.searchImage.file === null ||
    thumbnails.tabImage.file === null
  ) {
    toast.warn('Please select all thumbnail images.');
    return false;
  } else {
    // Reset error styles
    removeErrorStyles([
      mainImageRef,
      backgroundImageRef,
      menuImageRef,
      horizontalHeaderImageRef,
      verticalHeaderImageRef,
      smallHeaderImageRef,
      searchImageRef,
      tabImageRef,
    ]);
    return true;
  }
};

// Validate screenshots section
export const validateMedia = (screenshots: Screenshot[], duplicateError: boolean): boolean => {
  if (screenshots.length < 4 || duplicateError) {
    toast.warn('Please add at least 4 screenshots');
    return false;
  }
  if (screenshots.filter((screenshot) => screenshot.featured).length !== 4) {
    toast.warn('Please mark 4 screenshots as featured');
    return false;
  }
  // Reset error styles
  return true;
};

// Validate pricing section
export const validatePricing = (
  pricing: Pricing,
  priceRef: RefObject<HTMLInputElement | null>
): boolean => {
  if (pricing.free && pricing.price === '' && priceRef.current) {
    addErrorStyle(priceRef);
    toast.warn('Please select at least one developer and publisher');
    return false;
  } else {
    // Reset error styles
    if (priceRef.current) removeErrorStyles([priceRef]);
    return true;
  }
};

// Validate specifications section
export const validateSpecifications = (
  data: {
    tags: number[];
    features: number[];
    languages: Language[];
    platforms: Platforms;
  },
  refs: {
    tagsRef: RefObject<HTMLDivElement | null>;
    featuresRef: RefObject<HTMLDivElement | null>;
    languagesRef: RefObject<HTMLDivElement | null>;
    languagesTableRef: RefObject<HTMLDivElement | null>;
    platformsRef: RefObject<HTMLDivElement | null>;
  }
): boolean => {
  const { tags, features, languages, platforms } = data;
  const { tagsRef, featuresRef, languagesRef, languagesTableRef, platformsRef } = refs;

  if (tags.length < 4 && tagsRef.current) addErrorStyle(tagsRef);
  if (features.length === 0 && featuresRef.current) addErrorStyle(featuresRef);
  if (languages.length === 0 && languagesRef.current) addErrorStyle(languagesRef);
  if (
    languages.some((language) => !language.fullAudio && !language.interface) &&
    languagesTableRef.current
  )
    addErrorStyle(languagesTableRef);
  if (platforms.win === false && platforms.mac === false && platformsRef.current)
    addErrorStyle(platformsRef);

  if (
    tags.length < 4 ||
    features.length === 0 ||
    languages.length === 0 ||
    languages.some((language) => !language.fullAudio && !language.interface) ||
    (platforms.win === false && platforms.mac === false)
  ) {
    toast.warn('Please fill in all required fields!');
    return false;
  } else {
    // Reset error styles
    removeErrorStyles([tagsRef, featuresRef, languagesRef, languagesTableRef, platformsRef]);
    return true;
  }
};

// Validate system requirements section
export const validateSystemRequirements = (
  systemRequirements: SystemRequirements,
  refs: {
    miniOsRef: RefObject<HTMLInputElement | null>;
    miniCpuRef: RefObject<HTMLInputElement | null>;
    miniRamRef: RefObject<HTMLInputElement | null>;
    miniGpuRef: RefObject<HTMLInputElement | null>;
    recommendedOsRef: RefObject<HTMLInputElement | null>;
    recommendedCpuRef: RefObject<HTMLInputElement | null>;
    recommendedRamRef: RefObject<HTMLInputElement | null>;
    recommendedGpuRef: RefObject<HTMLInputElement | null>;
  }
): boolean => {
  const {
    miniOsRef,
    miniCpuRef,
    miniRamRef,
    miniGpuRef,
    recommendedOsRef,
    recommendedCpuRef,
    recommendedRamRef,
    recommendedGpuRef,
  } = refs;

  if (systemRequirements.mini.os === '' && miniOsRef.current) addErrorStyle(miniOsRef);
  if (systemRequirements.mini.cpu === '' && miniCpuRef.current) addErrorStyle(miniCpuRef);
  if (systemRequirements.mini.ram === '' && miniRamRef.current) addErrorStyle(miniRamRef);
  if (systemRequirements.mini.gpu === '' && miniGpuRef.current) addErrorStyle(miniGpuRef);
  if (systemRequirements.recommended.os === '' && recommendedOsRef.current)
    addErrorStyle(recommendedOsRef);
  if (systemRequirements.recommended.cpu === '' && recommendedCpuRef.current)
    addErrorStyle(recommendedCpuRef);
  if (systemRequirements.recommended.ram === '' && recommendedRamRef.current)
    addErrorStyle(recommendedRamRef);
  if (systemRequirements.recommended.gpu === '' && recommendedGpuRef.current)
    addErrorStyle(recommendedGpuRef);

  if (
    systemRequirements.mini.os === '' ||
    systemRequirements.mini.cpu === '' ||
    systemRequirements.mini.ram === '' ||
    systemRequirements.mini.gpu === '' ||
    systemRequirements.recommended.os === '' ||
    systemRequirements.recommended.cpu === '' ||
    systemRequirements.recommended.ram === '' ||
    systemRequirements.recommended.gpu === ''
  ) {
    toast.warn('Please fill in all required fields!');
    return false;
  } else {
    // Reset error styles
    removeErrorStyles([
      miniOsRef,
      miniCpuRef,
      miniRamRef,
      miniGpuRef,
      recommendedOsRef,
      recommendedCpuRef,
      recommendedRamRef,
      recommendedGpuRef,
    ]);
    return true;
  }
};

// Validate additional info section
export const validateAdditionalInfo = (
  data: { link: string; about: string; mature: boolean; matureDescription: string; legal: string },
  refs: {
    linkRef: RefObject<HTMLInputElement | null>;
    aboutRef: RefObject<HTMLTextAreaElement | null>;
    matureDescriptionRef: RefObject<HTMLTextAreaElement | null>;
    legalRef: RefObject<HTMLTextAreaElement | null>;
  }
): boolean => {
  const { link, about, mature, matureDescription, legal } = data;
  const { linkRef, aboutRef, matureDescriptionRef, legalRef } = refs;

  if (link !== '' && !validateUrl(link) && linkRef.current) {
    addErrorStyle(linkRef);
    toast.warn('Invalid link format');
  }
  if (about.length < 30 && aboutRef.current) {
    addErrorStyle(aboutRef);
    toast.warn('About is too short');
  }
  if (mature && matureDescription.length < 15 && matureDescriptionRef.current) {
    addErrorStyle(matureDescriptionRef);
    toast.warn('Mature description is too short');
  }
  if (legal.length < 5 && legalRef.current) {
    addErrorStyle(legalRef);
    toast.warn('Legal is too short');
  }

  if (
    (link !== '' && !validateUrl(link)) ||
    about.length < 30 ||
    (mature && matureDescription.length < 15) ||
    legal.length < 5
  ) {
    toast.warn('Please fill in all required fields!');
    return false;
  } else {
    // Reset error styles
    removeErrorStyles([linkRef, aboutRef, matureDescriptionRef, legalRef]);
    return true;
  }
};
