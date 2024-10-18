/**
 * Get 7 days from now
 * @returns The date 7 days from now
 */
export default function get7DaysFromNow(): Date {
  const now: Date = new Date();
  now.setDate(now.getDate() + 7);
  return now;
}
