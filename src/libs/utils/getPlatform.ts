/**
 * Get the platform of the user
 * @returns The platform of the user
 */
export default function getPlatform(): string {
  if (typeof navigator !== 'undefined') {
    const userAgent: string = navigator.userAgent.toLowerCase();

    if (userAgent.includes('mac')) {
      return 'darwin';
    } else if (userAgent.includes('win')) {
      return 'win32';
    } else {
      return 'unknown';
    }
  }
  return 'unknown';
}
