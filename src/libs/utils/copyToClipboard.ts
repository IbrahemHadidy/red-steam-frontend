import { toast } from 'react-toastify';

/**
 * Copy text to clipboard with toast message
 * @param type Text type
 * @param value Text value
 */
export default function copyToClipboard(type: string, value: string): void {
  navigator.clipboard.writeText(value);
  toast.success(`${type} copied to clipboard`);
}
