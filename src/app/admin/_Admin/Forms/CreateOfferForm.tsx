// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setDiscountEndDate,
  setDiscountPrice,
  setDiscountStartDate,
  setOfferType,
} from '@store/features/admin/adminSlice';

// Utils
import Decimal from 'decimal.js';

// Types
import type { ChangeEvent, RefObject } from 'react';

interface CreateOfferFormProps {
  discountPriceRef: RefObject<HTMLInputElement | null>;
  offerTypeRef: RefObject<HTMLInputElement | null>;
  discountStartDateRef: RefObject<HTMLInputElement | null>;
  discountEndDateRef: RefObject<HTMLInputElement | null>;
}

export default function CreateOfferForm({
  discountPriceRef,
  offerTypeRef,
  discountStartDateRef,
  discountEndDateRef,
}: CreateOfferFormProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const {
    offerGame,
    discountPrice,
    offerType,
    discountStartDate,
    discountEndDate,
    isEditModalOpen,
  } = useAppSelector((state) => state.admin.common);

  //--------------------------- Event Handlers ----------------------------//
  const handleDiscountPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountPrice(new Decimal(e.target.value).toString()));
  };

  const handleOfferTypeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'offerTypeSpecial') {
      dispatch(setOfferType('SPECIAL PROMOTION'));
    } else if (e.target.id === 'offerTypeWeekend') {
      dispatch(setOfferType('WEEKEND DEAL'));
    }
  };

  const handleDiscountStartDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountStartDate(new Date(e.target.value).toString()));
  };

  const handleDiscountEndDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountEndDate(new Date(e.target.value).toString()));
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <div className="form-area">
        <label className="form-label">Discount price</label>
        <input
          type="number"
          className="form-input"
          value={isEditModalOpen ? '' : discountPrice}
          onChange={handleDiscountPriceChange}
          placeholder={`Discount price, Current price: ${offerGame?.pricing?.basePrice}`}
          ref={discountPriceRef}
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
            onChange={handleOfferTypeChange}
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
            onChange={handleOfferTypeChange}
          />
          WEEKEND DEAL
        </label>
      </div>

      <div className="form-area">
        <label className="form-label">Discount start date</label>
        <input
          type="date"
          className="form-input"
          value={isEditModalOpen ? '' : discountStartDate}
          onChange={handleDiscountStartDateChange}
          placeholder="Discount start date"
          ref={discountStartDateRef}
        />
      </div>

      <div className="form-area">
        <label className="form-label">Discount end date</label>
        <input
          type="date"
          className="form-input"
          value={isEditModalOpen ? '' : discountEndDate}
          onChange={handleDiscountEndDateChange}
          placeholder="Discount end date"
          ref={discountEndDateRef}
        />
      </div>
    </>
  );
}
