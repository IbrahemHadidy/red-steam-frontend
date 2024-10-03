// DecimalJS
import Decimal from 'decimal.js';

// Types
import type { ChangeEvent, Dispatch, JSX, RefObject, SetStateAction } from 'react';
import type { Pricing } from './game-admin.types';
interface PricingProps {
  pricing: Pricing;
  setPricing: Dispatch<SetStateAction<Pricing>>;
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
  priceRef: RefObject<HTMLInputElement>;
  linkRef: RefObject<HTMLInputElement>;
}

export default function Pricing({
  pricing,
  setPricing,
  link,
  setLink,
  priceRef,
  linkRef,
}: PricingProps): JSX.Element {
  // Event handlers
  const handleFreeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPricing({ ...pricing, free: e.target.checked });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPricing({ ...pricing, price: e.target.value !== '' ? new Decimal(e.target.value) : '' });
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };

  return (
    <section className="pricing-section">
      <h2>Pricing and Availability</h2>
      <div className="form-field form-field-checkbox">
        <label className="field-label-checkbox">Free:</label>
        <input
          type="checkbox"
          className="field-checkbox"
          checked={pricing.free}
          onChange={handleFreeChange}
        />
      </div>
      {!pricing.free && (
        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Price</label>
            <p>*Required</p>
          </div>
          <input
            type="number"
            className="field-input"
            value={pricing.price?.toString() ?? ''}
            onChange={handlePriceChange}
            ref={priceRef}
          />
        </div>
      )}
      <div className="form-field">
        <label className="field-label">Link (optional)</label>
        <input
          type="text"
          className="field-input"
          value={link}
          onChange={handleLinkChange}
          ref={linkRef}
        />
      </div>
    </section>
  );
};
