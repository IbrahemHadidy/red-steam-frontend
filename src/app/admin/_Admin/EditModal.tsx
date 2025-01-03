// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  resetInputs,
  setDiscountEndDate,
  setDiscountPrice,
  setDiscountStartDate,
  setIcon,
  setIsEditModalOpen,
  setName,
  setOfferType,
  setWebsite,
} from '@store/features/admin/adminSlice';

// Redux Thunks
import { updateItem } from '@store/features/admin/adminThunks';

// Utils
import getBase64FromFile from '@utils/getBase64FromFile';
import Decimal from 'decimal.js';

// Enums
import { AdminType } from '@enums/admin';

// Types
import type { ChangeEvent, FormEvent } from 'react';

export default function EditModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const {
    adminType,
    name,
    website,
    discountPrice,
    offerType,
    discountStartDate,
    discountEndDate,
    isFetching,
  } = useAppSelector((state) => state.admin.common);

  //---------------------------- Event Handlers ---------------------------//
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(updateItem());
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setName(e.target.value));
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setWebsite(e.target.value));
  };

  const handleDiscountPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountPrice(new Decimal(e.target.value).toString()));
  };

  const handleOfferTypeChange = (offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL'): void => {
    dispatch(setOfferType(offerType));
  };

  const handleDiscountStartDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const dateValue = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      dispatch(setDiscountStartDate(dateValue.toISOString()));
    }
  };

  const handleDiscountEndDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const dateValue = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      dispatch(setDiscountEndDate(dateValue.toISOString()));
    }
  };

  const handleIconChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64String = await getBase64FromFile(file);
    dispatch(setIcon(base64String));
  };

  const closeModal = (): void => {
    dispatch(setIsEditModalOpen(false));
    dispatch(resetInputs());
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="edit-modal">
        <form onSubmit={handleSubmit}>
          {[AdminType.Offer, AdminType.CreateOffer].includes(adminType) ? (
            <>
              <div className="form-group">
                <label htmlFor="discountPrice">Discount Price</label>
                <input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  value={discountPrice.toString()}
                  onChange={handleDiscountPriceChange}
                />
              </div>

              <div className="form-group radio">
                <label className="form-label" htmlFor="offerTypeSpecial">
                  SPECIAL PROMOTION
                </label>
                <input
                  id="offerTypeSpecial"
                  name="offerType"
                  className="form-input"
                  type="radio"
                  checked={offerType === 'SPECIAL PROMOTION'}
                  onChange={() => handleOfferTypeChange('SPECIAL PROMOTION')}
                />
              </div>

              <div className="form-group radio">
                <label className="form-label" htmlFor="offerTypeWeekend">
                  WEEKEND DEAL
                </label>
                <input
                  id="offerTypeWeekend"
                  name="offerType"
                  className="form-input"
                  type="radio"
                  checked={offerType === 'WEEKEND DEAL'}
                  onChange={() => handleOfferTypeChange('WEEKEND DEAL')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountStartDate">Discount Start Date</label>
                <input
                  id="discountStartDate"
                  name="discountStartDate"
                  type="date"
                  value={discountStartDate.split('T')[0]}
                  onChange={handleDiscountStartDateChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountEndDate">Discount End Date</label>
                <input
                  id="discountEndDate"
                  name="discountEndDate"
                  type="date"
                  value={discountEndDate.split('T')[0]}
                  onChange={handleDiscountEndDateChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              {(adminType === AdminType.Developer || adminType === AdminType.Publisher) && (
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={website}
                    onChange={handleWebsiteChange}
                  />
                </div>
              )}

              {adminType === AdminType.Feature && (
                <div className="form-group">
                  <label htmlFor="icon">Icon</label>
                  <input id="icon" name="icon" type="file" onChange={handleIconChange} />
                </div>
              )}
            </>
          )}

          <button type="submit" disabled={isFetching}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
