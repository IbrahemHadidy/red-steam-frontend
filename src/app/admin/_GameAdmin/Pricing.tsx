// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { toggleFree, updatePrice } from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from './FormButtons';

// Form Validation
import { validatePricing } from './validations';

// Types
import type { ChangeEvent } from 'react';

export default function Pricing() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { pricing } = useAppSelector((state) => state.admin.game);

  //------------------------ Refs for Input Fields ------------------------//
  const priceRef = useRef<HTMLInputElement>(null);

  //--------------------------- Event Handlers ----------------------------//
  const handleFreeChange = (): void => {
    dispatch(toggleFree());
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updatePrice(value));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      <section className="pricing-section">
        <h2>Pricing</h2>

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
      </section>

      <br />
      <FormButtons validation={() => validatePricing(pricing, priceRef)} />
    </>
  );
}
