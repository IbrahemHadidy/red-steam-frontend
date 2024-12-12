// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { submitItem } from '@store/features/admin/adminThunks';

// Validations
import {
  validateCompanyInfo,
  validateFeatureInfo,
  validateLanguageInfo,
  validateOfferInfo,
  validateTagInfo,
} from './utils/validations';

// Components
import CreateCompanyForm from './Forms/CreateCompanyForm';
import CreateFeatureForm from './Forms/CreateFeatureForm';
import CreateLanguageForm from './Forms/CreateLanguageForm';
import CreateOfferForm from './Forms/CreateOfferForm';
import CreateTagForm from './Forms/CreateTagForm';

// Enums
import { AdminType } from '@enums/admin';

// Types
import type { FormEvent } from 'react';

export default function Create() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const {
    adminType,
    name,
    website,
    icon,
    offerGame,
    discountPrice,
    offerType,
    discountStartDate,
    discountEndDate,
    isFetching,
  } = useAppSelector((state) => state.admin.common);

  //-------------------------------- Refs ---------------------------------//
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLInputElement>(null);
  const discountPriceRef = useRef<HTMLInputElement>(null);
  const offerTypeRef = useRef<HTMLInputElement>(null);
  const discountStartDateRef = useRef<HTMLInputElement>(null);
  const discountEndDateRef = useRef<HTMLInputElement>(null);

  //---------------------------- Event Handlers ---------------------------//
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    let validate = () => false;

    if (adminType === AdminType.DEVELOPER || adminType === AdminType.PUBLISHER) {
      validate = () => validateCompanyInfo({ name, website, nameRef, websiteRef });
    } else if (adminType === AdminType.FEATURE) {
      validate = () => validateFeatureInfo({ name, icon, nameRef, iconRef });
    } else if (adminType === AdminType.CREATE_OFFER) {
      validate = () =>
        validateOfferInfo({
          discountPrice,
          offerType,
          discountStartDate,
          discountEndDate,
          discountPriceRef,
          offerTypeRef,
          discountStartDateRef,
          discountEndDateRef,
        });
    } else if (adminType === AdminType.LANGUAGE) {
      validate = () => validateLanguageInfo({ name, nameRef });
    } else if (adminType === AdminType.TAG) {
      validate = () => validateTagInfo({ name, nameRef });
    }

    if (validate()) dispatch(submitItem());
  };

  return (
    <>
      <div className="creation-form">
        <h1 className="creation-form-title">
          Create{' '}
          {adminType === AdminType.CREATE_OFFER
            ? `offer for: ${offerGame?.name}`
            : adminType.charAt(0).toUpperCase() + adminType.slice(1).toLowerCase()}
        </h1>

        <section className="creation-section">
          <div className="form-row-flex">
            {adminType === AdminType.LANGUAGE && <CreateLanguageForm nameRef={nameRef} />}
            {adminType === AdminType.TAG && <CreateTagForm nameRef={nameRef} />}
            {adminType === AdminType.FEATURE && (
              <CreateFeatureForm nameRef={nameRef} iconRef={iconRef} />
            )}
            {[AdminType.DEVELOPER, AdminType.PUBLISHER].includes(adminType) && (
              <CreateCompanyForm nameRef={nameRef} websiteRef={websiteRef} />
            )}
            {adminType === AdminType.CREATE_OFFER && (
              <CreateOfferForm
                discountPriceRef={discountPriceRef}
                offerTypeRef={offerTypeRef}
                discountStartDateRef={discountStartDateRef}
                discountEndDateRef={discountEndDateRef}
              />
            )}
          </div>

          <button className="submit-button" onClick={handleSubmit} disabled={isFetching}>
            Submit
          </button>
        </section>
      </div>
    </>
  );
}
