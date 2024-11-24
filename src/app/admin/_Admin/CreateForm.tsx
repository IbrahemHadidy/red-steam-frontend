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

    if (adminType === 'developer' || adminType === 'publisher') {
      validate = () => validateCompanyInfo({ name, website, nameRef, websiteRef });
    } else if (adminType === 'feature') {
      validate = () => validateFeatureInfo({ name, icon, nameRef, iconRef });
    } else if (adminType === 'create-offer') {
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
    } else if (adminType === 'language') {
      validate = () => validateLanguageInfo({ name, nameRef });
    } else if (adminType === 'tag') {
      validate = () => validateTagInfo({ name, nameRef });
    }

    if (validate()) dispatch(submitItem());
  };

  return (
    <>
      <div className="creation-form">
        <h1 className="creation-form-title">
          Create {adminType === 'create-offer' ? `offer for: ${offerGame?.name}` : adminType}
        </h1>

        <section className="creation-section">
          <div className="form-row-flex">
            {adminType === 'language' && <CreateLanguageForm nameRef={nameRef} />}
            {adminType === 'tag' && <CreateTagForm nameRef={nameRef} />}
            {adminType === 'feature' && <CreateFeatureForm nameRef={nameRef} iconRef={iconRef} />}
            {['developer', 'publisher'].includes(adminType) && (
              <CreateCompanyForm nameRef={nameRef} websiteRef={websiteRef} />
            )}
            {adminType === 'create-offer' && (
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
