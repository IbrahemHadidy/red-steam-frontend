import copyToClipboard from '@utils/copyToClipboard';

import type { Language } from '@interfaces/language';

interface LanguageRowsProps {
  item: Language;
}

export default function LanguageRows({ item }: LanguageRowsProps) {
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
