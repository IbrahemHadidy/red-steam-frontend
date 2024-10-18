/**
 * Format date to DD/MMM/YYYY
 * @param date The date object to format
 * @returns DD/MMM/YYYY
 * @example formatDate(new Date('2018-09-14')) // 14 Sept 2018
 */
export default function formatDate(date: Date | undefined): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', options).replace(',', '');
}
