import copyToClipboard from '@utils/copyToClipboard';

import type { Company } from '@interfaces/company';

interface CompanyRowsProps {
  item: Company;
}

export default function CompanyRows({ item }: CompanyRowsProps) {
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
      <td
        className="copy-to-clipboard"
        title="Copy to clipboard"
        onClick={() => copyToClipboard('Website', item.website)}
      >
        {item.website}
      </td>
    </>
  );
}
