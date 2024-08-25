import type { ChangeEvent, Dispatch, FC, JSX, RefObject, SetStateAction } from 'react';
import type { Pricing } from '../create-game.types';
interface PricingProps {
  pricing: Pricing;
  setPricing: Dispatch<SetStateAction<Pricing>>;
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
  priceRef: RefObject<HTMLInputElement>;
  linkRef: RefObject<HTMLInputElement>;
}

const Pricing: FC<PricingProps> = ({
  pricing,
  setPricing,
  link,
  setLink,
  priceRef,
  linkRef,
}): JSX.Element => {
  // Event handlers
  const handleFreeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPricing({ ...pricing, free: e.target.checked });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPricing({ ...pricing, price: e.target.valueAsNumber });
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };

  return (
    <section>
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
            step="0.01"
            className="field-input"
            value={pricing.price ?? ''}
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

export default Pricing;
