import { toast } from 'react-toastify';

import type { RefObject } from 'react';

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

export const validateCompanyInfo = ({
  name,
  website,
  nameRef,
  websiteRef,
}: {
  name: string;
  website: string;
  nameRef: RefObject<HTMLInputElement | null>;
  websiteRef: RefObject<HTMLInputElement | null>;
}) => {
  if (name === '' && nameRef.current) addErrorStyle(nameRef);
  if (website === '' && websiteRef.current) addErrorStyle(websiteRef);

  if (name === '' || website === '') {
    toast.warn('Please fill in all required fields');
    return false;
  } else {
    removeErrorStyles([nameRef, websiteRef]);
    return true;
  }
};

export const validateFeatureInfo = ({
  name,
  icon,
  nameRef,
  iconRef,
}: {
  name: string;
  icon: string;
  nameRef: RefObject<HTMLInputElement | null>;
  iconRef: RefObject<HTMLInputElement | null>;
}) => {
  if (name === '' && nameRef.current) addErrorStyle(nameRef);
  if (icon === '' && iconRef.current) addErrorStyle(iconRef);

  if (name === '' || icon === '') {
    toast.warn('Please fill in all required fields');
    return false;
  } else {
    removeErrorStyles([nameRef, iconRef]);
    return true;
  }
};

export const validateOfferInfo = ({
  discountPrice,
  offerType,
  discountStartDate,
  discountEndDate,
  discountPriceRef,
  offerTypeRef,
  discountStartDateRef,
  discountEndDateRef,
}: {
  discountPrice: string;
  offerType: string;
  discountStartDate: string;
  discountEndDate: string;
  discountPriceRef: RefObject<HTMLInputElement | null>;
  offerTypeRef: RefObject<HTMLInputElement | null>;
  discountStartDateRef: RefObject<HTMLInputElement | null>;
  discountEndDateRef: RefObject<HTMLInputElement | null>;
}) => {
  if (discountPrice === '' && discountPriceRef.current) addErrorStyle(discountPriceRef);
  if (offerType === '' && offerTypeRef.current) addErrorStyle(offerTypeRef);
  if (discountStartDate === '' && discountStartDateRef.current) addErrorStyle(discountStartDateRef);
  if (discountEndDate === '' && discountEndDateRef.current) addErrorStyle(discountEndDateRef);

  if (
    discountPrice === '' ||
    offerType === '' ||
    discountStartDate === '' ||
    discountEndDate === ''
  ) {
    toast.warn('Please fill in all required fields');
    return false;
  } else {
    removeErrorStyles([discountPriceRef, offerTypeRef, discountStartDateRef, discountEndDateRef]);
    return true;
  }
};

export const validateLanguageInfo = ({
  name,
  nameRef,
}: {
  name: string;
  nameRef: RefObject<HTMLInputElement | null>;
}) => {
  if (name === '' && nameRef.current) {
    addErrorStyle(nameRef);
    toast.warn('Please fill in all required fields');
    return false;
  } else {
    removeErrorStyles([nameRef]);
    return true;
  }
};

export const validateTagInfo = ({
  name,
  nameRef,
}: {
  name: string;
  nameRef: RefObject<HTMLInputElement | null>;
}) => {
  if (name === '' && nameRef.current) {
    addErrorStyle(nameRef);
    toast.warn('Please fill in all required fields');
    return false;
  } else {
    removeErrorStyles([nameRef]);
    return true;
  }
};
