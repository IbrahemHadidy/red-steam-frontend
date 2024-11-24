import Image from 'next/image';

import copyToClipboard from '@utils/copyToClipboard';

import negativeIcon from '@images/negative.png';
import positiveIcon from '@images/positive.png';

import type { Review } from '@interfaces/review';

interface ReviewRowsProps {
  item: Review;
}

export default function ReviewRows({ item }: ReviewRowsProps) {
  return (
    <>
      <td>{item.id}</td>
      <td
        className="copy-to-clipboard"
        title="Copy to clipboard"
        onClick={() => copyToClipboard('Username', item.user?.username ?? '')}
      >
        {item.user?.username}
      </td>
      <td
        className="copy-to-clipboard"
        title="Copy to clipboard"
        onClick={() => item.game?.name && copyToClipboard('Game name', item.game.name)}
      >
        {item.game?.name && item.game.name}
      </td>
      <td
        className="copy-to-clipboard"
        title="Copy to clipboard"
        onClick={() => copyToClipboard('Content', item.content)}
      >
        {item.content}
      </td>
      <td className="center">
        {item.positive ? (
          <Image src={positiveIcon} alt="Positive" width={30} height={30} />
        ) : (
          <Image src={negativeIcon} alt="Negative" width={30} height={30} />
        )}
      </td>
    </>
  );
}
