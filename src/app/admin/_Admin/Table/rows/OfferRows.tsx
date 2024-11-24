import copyToClipboard from '@utils/copyToClipboard';
import formatDate from '@utils/formatDate';

import type { Game } from '@interfaces/game';

interface OfferRowsProps {
  item: Game;
}

export default function OfferRows({ item }: OfferRowsProps) {
  return (
    <>
      <td>{item.id}</td>
      <td
        className="copy-to-clipboard"
        title="Copy to clipboard"
        onClick={() => copyToClipboard('Game name', item.name)}
      >
        {item.name}
      </td>
      <td>${item.pricing?.basePrice} USD</td>
      <td>${item.pricing?.discountPrice} USD</td>
      <td>{item.pricing?.discountPercentage}%</td>
      <td>{item.pricing?.offerType}</td>
      <td>{formatDate(item.pricing?.discountStartDate)}</td>
      <td>{formatDate(item.pricing?.discountEndDate)}</td>
    </>
  );
}
