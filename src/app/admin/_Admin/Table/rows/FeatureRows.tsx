import convertToBase64Image from '@utils/convertToBase64Image';
import copyToClipboard from '@utils/copyToClipboard';

import type { Feature } from '@interfaces/feature';

interface FeatureRowsProps {
  item: Feature;
}

export default function FeatureRows({ item }: FeatureRowsProps) {
  return (
    <>
      <td>{item.id}</td>
      <td
        className="copy-to-clipboard"
        title="Copy to clipboard"
        onClick={() => copyToClipboard('Name', item.name)}
      >
        {item.name}
      </td>
      <td className="icon">
        <img src={convertToBase64Image(item.icon.data)} alt={item.name} />
      </td>
    </>
  );
}
