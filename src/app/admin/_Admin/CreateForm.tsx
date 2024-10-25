// React
import { useRef, useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Utils
import Decimal from 'decimal.js';

// Types
import type { FormEvent, JSX, RefObject } from 'react';
import type { CreateProps } from './admin.types';

export default function Create({
  type,
  name,
  setName,
  website,
  setWebsite,
  game,
  discountPrice,
  setDiscountPrice,
  offerType,
  setOfferType,
  discountStartDate,
  setDiscountStartDate,
  discountEndDate,
  setDiscountEndDate,
  handleIconChange,
  icon,
  onSubmit,
}: CreateProps): JSX.Element {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLInputElement>(null);
  const discountPriceRef = useRef<HTMLInputElement>(null);
  const offerTypeRef = useRef<HTMLInputElement>(null);
  const discountStartDateRef = useRef<HTMLInputElement>(null);
  const discountEndDateRef = useRef<HTMLInputElement>(null);

  // Utils
  const errorStyle: string = 'border: 1px solid rgb(255, 82, 82);';
  const checkFormValidation = (): boolean => {
    if (type === 'developer' || type === 'publisher') {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
      }
      if (website === '' && websiteRef.current) {
        websiteRef.current.style.cssText += errorStyle;
      }
      if (name === '' || website === '') {
        toast.warn('Please fill in all required fields');
        return false;
      }
    } else if (type === 'feature') {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
      }
      if (icon === '' && iconRef.current) {
        iconRef.current.style.cssText += errorStyle;
      }
      if (name === '' || icon === '') {
        toast.warn('Please fill in all required fields');
        return false;
      }
    } else if (type === 'create-offer' && discountPriceRef.current) {
      if (discountPrice === null && nameRef.current) {
        discountPriceRef.current.style.cssText += errorStyle;
      }
      if (offerType === null && offerTypeRef.current) {
        offerTypeRef.current.style.cssText += errorStyle;
      }
      if (discountStartDate === null && discountStartDateRef.current) {
        discountStartDateRef.current.style.cssText += errorStyle;
      }
      if (discountEndDate === null && discountEndDateRef.current) {
        discountEndDateRef.current.style.cssText += errorStyle;
      }
      if (
        discountPrice === null ||
        offerType === null ||
        discountStartDate === null ||
        discountEndDate === null
      ) {
        toast.warn('Please fill in all required fields');
        return false;
      }
    } else {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
        toast.warn('Please fill in all required fields');
        return false;
      }
    }

    return true;
  };

  const resetAllWarnings = (): void => {
    const removeErrorStyle = (refs: RefObject<HTMLInputElement | null>[]) => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.cssText = ref.current.style.cssText.replace(errorStyle, '');
        }
      });
    };

    removeErrorStyle([nameRef, websiteRef, iconRef]);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (checkFormValidation()) {
      resetAllWarnings();
      try {
        setIsLoading(true);
        onSubmit && onSubmit(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="creation-form">
        <h1 className="creation-form-title">
          Create {type === 'create-offer' ? `offer for: ${game?.name}` : type}
        </h1>

        <section className="creation-section">
          <div className="form-row-flex">
            {type === 'create-offer' &&
              setDiscountPrice &&
              setOfferType &&
              setDiscountStartDate &&
              setDiscountEndDate && (
                <>
                  <div className="form-area">
                    <label className="form-label">Discount price</label>
                    <input
                      type="number"
                      className="form-input"
                      value={discountPrice?.toString()}
                      onChange={(e) => setDiscountPrice(new Decimal(e.target.value || '0.00'))}
                      placeholder={`Discount price, Current price: ${game?.pricing?.basePrice}`}
                      ref={nameRef}
                    />
                  </div>

                  <div className="form-area radio" ref={offerTypeRef}>
                    <h3 className="form-label">Offer type</h3>

                    <label className="form-label" htmlFor="offerTypeSpecial">
                      <input
                        id="offerTypeSpecial"
                        name="offerType"
                        className="form-input"
                        type="radio"
                        checked={offerType === 'SPECIAL PROMOTION'}
                        onChange={() => setOfferType('SPECIAL PROMOTION')}
                      />
                      SPECIAL PROMOTION
                    </label>

                    <label className="form-label" htmlFor="offerTypeWeekend">
                      <input
                        id="offerTypeWeekend"
                        name="offerType"
                        className="form-input"
                        type="radio"
                        checked={offerType === 'WEEKEND DEAL'}
                        onChange={() => setOfferType('WEEKEND DEAL')}
                      />
                      WEEKEND DEAL
                    </label>
                  </div>

                  <div className="form-area">
                    <label className="form-label">Discount start date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={discountStartDate && discountStartDate.toISOString().split('T')[0]}
                      onChange={(e) => setDiscountStartDate(new Date(e.target.value))}
                      placeholder="Discount start date"
                      ref={discountStartDateRef}
                    />
                  </div>

                  <div className="form-area">
                    <label className="form-label">Discount end date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={discountEndDate && discountEndDate.toISOString().split('T')[0]}
                      onChange={(e) => setDiscountEndDate(new Date(e.target.value))}
                      placeholder="Discount end date"
                      ref={discountEndDateRef}
                    />
                  </div>
                </>
              )}

            {type !== 'create-offer' && setName && (
              <div className="form-area">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  ref={nameRef}
                />
              </div>
            )}

            {['developer', 'publisher'].includes(type) && setWebsite && (
              <div className="form-area">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  className="form-input"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website"
                  ref={websiteRef}
                />
              </div>
            )}

            {type === 'feature' && handleIconChange && (
              <div className="form-area">
                <label className="form-label">Feature Icon</label>
                <input
                  type="file"
                  className="form-input"
                  accept="image/*"
                  onChange={handleIconChange}
                  placeholder="Feature Icon"
                  ref={iconRef}
                />
              </div>
            )}
          </div>

          <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
            Submit
          </button>
        </section>
      </div>
    </>
  );
}
