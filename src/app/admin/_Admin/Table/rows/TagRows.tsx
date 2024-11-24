import copyToClipboard from '@utils/copyToClipboard';

import type { Tag } from '@interfaces/tag';

interface TagRowsProps {
  item: Tag;
}

export default function TagRows({ item }: TagRowsProps) {
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
    </>
  );
}
