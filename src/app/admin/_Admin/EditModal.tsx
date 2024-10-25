// React
import { useCallback, useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { updateDeveloper } from '@services/common/developers';
import { updateFeature } from '@services/common/features';
import { updateLanguage } from '@services/common/languages';
import { updatePublisher } from '@services/common/publishers';
import { updateTag } from '@services/common/tags';
import { updateOffer } from '@services/game/offer';
import { updateUser } from '@services/user/admin';

// Utils
import formatDate from '@utils/formatDate';
import get7DaysFromNow from '@utils/get7DaysFromNow';
import { isCompany, isFeature, isPricing, isReview, isUser } from '@utils/typeGuards';
import Decimal from 'decimal.js';

// Types
import type { ChangeEvent, FormEvent } from 'react';
import type { EditModalProps } from './admin.types';

export default function EditModal({ type, setOpen, item }: EditModalProps) {
  // States
  const [name, setName] = useState<string>(
    !isUser(item) && !isPricing(item) && !isReview(item) ? item.name : ''
  );
  const [website, setWebsite] = useState<string>(isCompany(item) ? item.website : '');
  const [icon, setIcon] = useState<string>(isFeature(item) ? (item.icon as unknown as string) : '');
  const [admin, setAdmin] = useState<boolean>(isUser(item) ? item.isAdmin : false);
  const [verified, setVerified] = useState<boolean>(isUser(item) ? item.isVerified : false);
  const [discount, setDiscount] = useState<boolean>(isPricing(item) ? !!item.discount : false);
  const [discountPrice, setDiscountPrice] = useState<Decimal>(
    isPricing(item) ? new Decimal(item.discountPrice ?? '0.00') : new Decimal('0.00')
  );
  const [offerType, setOfferType] = useState<'SPECIAL PROMOTION' | 'WEEKEND DEAL'>(
    isPricing(item) ? item.offerType ?? 'SPECIAL PROMOTION' : 'SPECIAL PROMOTION'
  );
  const [discountStartDate, setDiscountStartDate] = useState<Date>(
    isPricing(item) ? item.discountStartDate ?? new Date() : new Date()
  );
  const [discountEndDate, setDiscountEndDate] = useState<Date>(
    isPricing(item) ? item.discountEndDate ?? get7DaysFromNow() : get7DaysFromNow()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      // Create a mapping between the type and the corresponding update function
      const updateFunctions = {
        feature: () => updateFeature(typeof item.id === 'number' ? item.id : 0, name.trim(), icon),
        developer: () =>
          updateDeveloper(typeof item.id === 'number' ? item.id : 0, name.trim(), website.trim()),
        publisher: () =>
          updatePublisher(typeof item.id === 'number' ? item.id : 0, name.trim(), website.trim()),
        tag: () => updateTag(typeof item.id === 'number' ? item.id : 0, name.trim()),
        language: () => updateLanguage(typeof item.id === 'number' ? item.id : 0, name.trim()),
        user: () => updateUser(typeof item.id === 'string' ? item.id : '0', verified, admin),
        offer: () =>
          updateOffer(
            isPricing(item) && typeof item.game?.id === 'number' ? item.game.id : 0,
            discount,
            discountPrice.toString(),
            offerType,
            discountStartDate,
            discountEndDate
          ),
        'create-offer': () =>
          updateOffer(
            isPricing(item) && typeof item.game?.id === 'number' ? item.game.id : 0,
            discount,
            discountPrice.toString(),
            offerType,
            discountStartDate,
            discountEndDate
          ),
        review: undefined,
      };

      // Check if the type exists in the mapping
      const updateFunction = updateFunctions[type];
      if (updateFunction) {
        // Call the respective function based on the type
        setIsLoading(true);
        const message: string = (await updateFunction()).message;
        toast.success(message);
        setIsLoading(false);
        setOpen(false);
        return;
      }

      // Handle the default case or if type doesn't match
      toast.error('Failed to update item');
      setOpen(false);
      return;
    },
    [
      admin,
      discount,
      discountEndDate,
      discountPrice,
      discountStartDate,
      icon,
      item,
      name,
      offerType,
      setOpen,
      type,
      verified,
      website,
    ]
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWebsite(e.target.value);
  };

  const handleVeifiedChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setVerified(e.target.checked);
  };

  const handleAdminChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAdmin(e.target.checked);
  };

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscount(e.target.checked);
  };

  const handleDiscountPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscountPrice(new Decimal(e.target.value));
  };

  const handleOfferTypeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === 'SPECIAL PROMOTION' || value === 'WEEKEND DEAL') {
      setOfferType(value);
    } else {
      console.error('Invalid offer type value');
    }
  };

  const handleDiscountStartDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscountStartDate(new Date(e.target.value));
  };

  const handleDiscountEndDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscountEndDate(new Date(e.target.value));
  };

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a data URL (Base64 encoded)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setIcon(reader.result.split(',')[1]); // Extract the Base64 string
        }
      };
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setOpen(false)} />
      <div className="edit-modal">
        <form onSubmit={handleSubmit}>
          {type === 'user' ? (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={isUser(item) ? item.username : ''}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={isUser(item) ? item.email : ''}
                  disabled
                />
              </div>
              <div className="form-group checkbox">
                <label htmlFor="username">Verified:</label>
                <input
                  id="verified"
                  name="verified"
                  type="checkbox"
                  checked={verified}
                  onChange={handleVeifiedChange}
                />
              </div>
              <div className="form-group checkbox">
                <label htmlFor="username">Admin:</label>
                <input
                  id="admin"
                  name="admin"
                  type="checkbox"
                  checked={admin}
                  onChange={handleAdminChange}
                />
              </div>
            </>
          ) : type === 'offer' ? (
            <>
              <div className="form-group checkbox">
                <label htmlFor="discount">Discount</label>
                <input
                  id="discount"
                  name="discount"
                  type="text"
                  checked={isPricing(item) ? item.discount : false}
                  onChange={handleDiscountChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountPrice">Discount Price</label>
                <input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  value={discountPrice.toString()}
                  onChange={handleDiscountPriceChange}
                  disabled={!discount}
                />
              </div>

              <div className="form-group radio">
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

              <div className="form-group">
                <label htmlFor="discountStartDate">Discount Start Date</label>
                <input
                  id="discountStartDate"
                  name="discountStartDate"
                  type="date"
                  value={formatDate(discountStartDate)}
                  onChange={handleDiscountStartDateChange}
                  disabled={!discount}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountEndDate">Discount End Date</label>
                <input
                  id="discountEndDate"
                  name="discountEndDate"
                  type="date"
                  value={formatDate(discountEndDate)}
                  onChange={handleDiscountEndDateChange}
                  disabled={!discount}
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

              {(type === 'developer' || type === 'publisher') && (
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

              {type === 'feature' && (
                <div className="form-group">
                  <label htmlFor="icon">Icon</label>
                  <input id="icon" name="icon" type="file" onChange={handleIconChange} />
                </div>
              )}
            </>
          )}

          <button type="submit" disabled={isLoading}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
