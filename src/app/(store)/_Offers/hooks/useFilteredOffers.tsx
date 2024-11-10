import { useEffect, useState } from 'react';

import type { Game } from '@interfaces/game';

export const useFilteredOffers = (offersData: Game[] | undefined) => {
  const [specialOffers, setSpecialOffers] = useState<Game[]>([]);
  const [weekendOffers, setWeekendOffers] = useState<Game[]>([]);

  useEffect(() => {
    const specials: Game[] = [];
    const weekends: Game[] = [];

    offersData?.forEach((game) => {
      if (game.pricing?.offerType === 'SPECIAL PROMOTION') {
        specials.push(game);
      }
      if (game.pricing?.offerType === 'WEEKEND DEAL') {
        weekends.push(game);
      }
    });

    setSpecialOffers(specials);
    setWeekendOffers(weekends);
  }, [offersData]);

  return { specialOffers, weekendOffers };
};
