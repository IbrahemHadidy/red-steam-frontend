import WeekendOffer from '../WeekendOffer';
import renderSmallGroups from './renderSmallGroups';

import type { Game } from '@interfaces/game';
import type { Dispatch, JSX, SetStateAction } from 'react';

export default function renderSlides(
  weekendOffers: Game[],
  specialOffers: Game[],
  totalSlides: number,
  setTotalSlides: Dispatch<SetStateAction<number>>
): JSX.Element[] {
  const SLOTS_PER_SLIDE: number = 6;
  const BIG_OFFER_SLOTS: number = 2; // 2 slots for each big offer
  const SMALL_GROUP_SLOTS: number = 2; // 2 slots for each small group

  const slides: JSX.Element[] = [];
  let currentSlide: JSX.Element[] = [];
  let currentSlots: number = 0;

  const addOfferToSlide = (offer: JSX.Element, slots: number): void => {
    if (currentSlots + slots <= SLOTS_PER_SLIDE) {
      currentSlide.push(offer);
      currentSlots += slots;
    } else {
      if (currentSlots === SLOTS_PER_SLIDE) {
        slides.push(<div className="offers-row">{currentSlide}</div>);
      }
      currentSlide = [offer];
      currentSlots = slots;
    }
  };

  // Process big offers
  let bigOfferCount: number = 0;
  weekendOffers.forEach((offer): void => {
    const bigOffer = <WeekendOffer offer={offer} key={offer.id} />;

    if (bigOfferCount < 2) {
      addOfferToSlide(bigOffer, BIG_OFFER_SLOTS);
      bigOfferCount += 1;
    }
    if (bigOfferCount === 2) {
      bigOfferCount = 0; // Reset after adding 2 big offers
      // After 2 big offers, add 1 small group if available
      const smallGroups: JSX.Element[] = renderSmallGroups(specialOffers);
      if (smallGroups.length > 0) {
        const smallGroup: JSX.Element | undefined = smallGroups.shift(); // Get the first small group
        if (smallGroup) {
          addOfferToSlide(smallGroup, SMALL_GROUP_SLOTS);
        }
      }
    }
  });

  // Add remaining small groups if any
  const remainingSmallGroups: JSX.Element[] = renderSmallGroups(specialOffers);
  remainingSmallGroups.forEach((smallGroup) => {
    addOfferToSlide(smallGroup, SMALL_GROUP_SLOTS);
  });

  // Push the last slide if it is full or if it is the first slide
  if (currentSlots === SLOTS_PER_SLIDE || (slides.length === 0 && currentSlide.length > 0)) {
    slides.push(<div className="offers-row">{currentSlide}</div>);
  }

  // Set the total number of slides
  if (totalSlides !== slides.length) {
    setTotalSlides(slides.length);
  }

  // Limit the number of slides to 6
  return slides.slice(0, 6);
}
