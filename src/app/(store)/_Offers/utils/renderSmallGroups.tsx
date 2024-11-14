import SpecialOffer from '../SpecialOffer';

import type { Game } from '@interfaces/game';
import type { JSX } from 'react';

export default function renderSmallGroups(specialOffers: Game[]): JSX.Element[] {
  const smallGroups: JSX.Element[] = [];
  for (let i = 0; i < specialOffers.length; i += 2) {
    const smallGroup: JSX.Element = (
      <div className="small-group" key={`small-group-${i}`}>
        {<SpecialOffer offer={specialOffers[i]} key={specialOffers[i].id} />}
        {specialOffers[i + 1] && (
          <SpecialOffer offer={specialOffers[i + 1]} key={specialOffers[i + 1].id} />
        )}
      </div>
    );
    smallGroups.push(smallGroup);
  }
  return smallGroups;
}
