const getPlatform = (): string => {
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
};

export default getPlatform;
