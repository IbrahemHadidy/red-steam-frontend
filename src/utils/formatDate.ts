const formatDate = (date: Date | undefined): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric', // Day of the month (1-31)
    month: 'short', // Abbreviated month name (e.g., "Apr")
    year: 'numeric', // Full year (e.g., "2014")
  };

  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', options).replace(',', '');
};
export default formatDate;
