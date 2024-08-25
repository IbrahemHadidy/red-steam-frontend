// React
import { useEffect, useRef, useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { getByParameters } from 'services/game/data';

// Types
import type { FC, FormEvent, JSX, RefObject } from 'react';
import type { Game } from 'types/game.types';
import type { CreateProps } from './admin.types';

const Create: FC<CreateProps> = ({
  type,
  name,
  setName,
  website,
  setWebsite,
  gameId,
  setGameId,
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
}): JSX.Element => {
  // States
  const [gameList, setGameList] = useState<Game[]>([]);

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
        toast.error('Please fill in all required fields');
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
        toast.error('Please fill in all required fields');
        return false;
      }
    } else if (type === 'offer' && discountPriceRef.current) {
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
        toast.error('Please fill in all required fields');
        return false;
      }
    } else {
      if (name === '' && nameRef.current) {
        nameRef.current.style.cssText += errorStyle;
        toast.error('Please fill in all required fields');
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getByParameters('');
      setGameList(games);
    };
    fetchGames();
  }, []);

  const resetAllWarnings = (): void => {
    const removeErrorStyle = (refs: RefObject<HTMLInputElement>[]) => {
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
      onSubmit && onSubmit(e);
    }
  };

  return (
    <>
      <div className="creation-form">
        <h1 className="creation-form-title">Create {type}</h1>
        <section className="creation-section">
          <div className="form-row-flex">
            {type === 'offer' &&
              setGameId &&
              setDiscountPrice &&
              setOfferType &&
              setDiscountStartDate &&
              setDiscountEndDate && (
                <>
                  <div className="form-area">
                    <label className="form-label">Game</label>
                    <select
                      className="form-input"
                      value={gameId}
                      onChange={(e) => setGameId(Number(e.target.value))}
                    >
                      {gameList.map((game) => (
                        <option key={game.id} value={game.id}>
                          {game.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-area">
                    <label className="form-label">Discount price</label>
                    <input
                      type="number"
                      className="form-input"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.valueAsNumber)}
                      placeholder="Discount price"
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
                      style={{ colorScheme: 'dark' }}
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
                      style={{ colorScheme: 'dark' }}
                      value={discountEndDate && discountEndDate.toISOString().split('T')[0]}
                      onChange={(e) => setDiscountEndDate(new Date(e.target.value))}
                      placeholder="Discount end date"
                      ref={discountEndDateRef}
                    />
                  </div>
                </>
              )}
            {type !== 'offer' && setName && (
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
            {type === ('developer' || 'publisher') && setWebsite && (
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
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </section>
      </div>
    </>
  );
};

export default Create;
