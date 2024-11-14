// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setCardSize } from '@store/features/shop/library/librarySlice';

// Types
import type { ChangeEvent } from 'react';

export default function CardSizeSlider() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { cardSize } = useAppSelector((state) => state.shop.library);

  //---------------------------- Event Handlers ----------------------------//
  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setCardSize(Number(event.target.value)));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="sizing">
      <h1>Card size:&nbsp;&nbsp;</h1>
      <input
        type="range"
        min="200"
        max="500"
        value={cardSize}
        onChange={handleSliderChange}
        step="10"
      />
    </div>
  );
}
